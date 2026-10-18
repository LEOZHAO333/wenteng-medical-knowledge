#!/usr/bin/env node
/** Priority queue only, NOT verified sources, veterinary review, or a publishing action. */
import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=join(dirname(fileURLToPath(import.meta.url)),'../content');
const names=readdirSync(dir).sort();
const sFiles=names.filter(s=>/^S-TIER-.*\.md$/.test(s));
const aFiles=names.filter(s=>/^A-TIER-BATCH-\d+-.*\.md$/.test(s));
const ledgerFiles=names.filter(s=>/^SOURCE-VERIFICATION-BATCH-\d+\.md$/.test(s));
const ledger=new Map();
for(const name of ledgerFiles){
  const data=readFileSync(join(dir,name),'utf8');
  for(const line of data.split(/\r?\n/)){
    if(!/^\|\s*\d{4}\s*\|/.test(line))continue;
    const cells=line.split('|').slice(1,-1).map(x=>x.replace(/\*/g,'').trim());
    const id=cells[0];
    const status=cells.slice(1).find(c=>/^(source_verified_editorial|needs_edit|hold|pending)(\b|\s|\+)/i.test(c));
    if(!status)continue;
    if(!ledger.has(id))ledger.set(id,[]);
    ledger.get(id).push({batch:name,history:status});
  }
}
function parse(files,tier){
 const list=[];
 for(const name of files){
   const source=readFileSync(join(dir,name),'utf8');
   const hs=[...source.matchAll(/^##\s+(\d{4})\s*｜\s*(.+?)\s*$/gm)];
   for(let j=0;j<hs.length;j++){
     const block=source.slice(hs[j].index,hs[j+1]?.index??source.length);
     const slug=block.match(/^\s*-\s*Slug\s*[：:]\s*\x60?([a-z0-9-]+)\x60?\s*$/m)?.[1]??null;
     list.push({id:hs[j][1],title:hs[j][2].trim(),slug,sourcePath:'pet-site/content/'+name,tier,answer:((block.match(/^\s*-\s*直接回答\s*[：:]\s*(.+)$/m)||[])[1]||'').trim()});
   }
 }
 return list;
}
const all=[...parse(sFiles,'S'),...parse(aFiles,'A')];
const p0Terms=/(抽搐|惊厥|无尿|尿不出|尿闭|排尿困难|呼吸困难|喘不过|张口呼吸|窒息|发绀|紫色|中毒|误食|毒物|吞食异物|误吞|呕血|咖啡渣|便血|血便|黑便|黑色便便|眼压|突然失明|突然看不见|歪头|站不稳|瘫痪|热射病|中暑|休克|急救|急诊|大出血|出血不止|高处坠落|持续呕吐|喝水也吐|肚子鼓|干呕|葡萄|木糖醇|巧克力|百合花|异物|癫痫|难产|拉稀带血)/;
const specialTerms=/(日本|新药|获批|批准|适应症|药品|用药|抗菌药|抗生素|激素|处方|输液|补液|剂量|滴耳药|药物|镇静|麻醉|疫苗|驱虫|化疗|癌症|肿瘤|安乐死)/;
function risk(t){
  const title=t.title;
  // Human-reviewed editorial triage exceptions. These are NOT medical diagnosis labels.
  if(['0093','0107','0110','0125','0144'].includes(t.id))return {grade:'P0',reason:'持续无法保留水分、疑似出血或腹胀干呕等高风险线索，优先复核紧急就医表述'};
  if(['0085','0217','0229','0794','0684','0777'].includes(t.id))return {grade:'P1',reason:'反复症状、术后照护、急诊准备或疑似虫咬/异物等场景需优先核实，标题关键词本身不能确诊急症'};
  if(p0Terms.test(title))return {grade:'P0',reason:'可能涉及时间敏感的急症/中毒/梗阻/神经问题，优先核实急诊边界'};
  if(specialTerms.test(title))return {grade:'P1',reason:'涉及药品、操作、日本监管或治疗边界，需确认适用条件'};
  return {grade:'P2',reason:'其他临床科普问题，补齐逐题来源核对'};
}
const queue=all.filter(x=>!ledger.has(x.id)).map(x=>({...x,clinicalRisk:risk(x),editorialSourceStatus:'not_in_existing_10_batch_ledgers',medicalReviewStatus:'pending',publicationState:'draft',indexEligible:false,notYetIndividuallyVerified:true}));
const ranks={P0:0,P1:1,P2:2};
queue.sort((a,b)=>ranks[a.clinicalRisk.grade]-ranks[b.clinicalRisk.grade] || (a.tier===b.tier?0:a.tier==='S'?-1:1) || a.id.localeCompare(b.id));
const counts={};
for(const e of queue){const k=e.tier+'-'+e.clinicalRisk.grade;counts[k]=(counts[k]||0)+1;}
const report={generatedFrom:'S/A markdown + SOURCE-VERIFICATION-BATCH-01...10',status:'draft_triage_only',method:'keyword heuristic; human medical triage required',counts,total:queue.length,items:queue};
if(process.argv.includes('--summary')){
 console.log(JSON.stringify({counts,total:queue.length,sUnreviewed:queue.filter(x=>x.tier==='S').map(({id,title,clinicalRisk,sourcePath})=>({id,title,priority:clinicalRisk.grade,sourcePath})),first25:queue.slice(0,25).map(({id,title,tier,clinicalRisk,sourcePath})=>({id,title,tier,priority:clinicalRisk.grade,sourcePath}))},null,2));
}else{
 const outfile=process.argv.find(x=>x.startsWith('--out='))?.slice('--out='.length);
 if(outfile)writeFileSync(outfile,JSON.stringify(report,null,2)+'\n','utf8');
 else console.log(JSON.stringify(report,null,2));
}
if(process.argv.includes('--check')){
 const s=queue.filter(x=>x.tier==='S'),a=queue.filter(x=>x.tier==='A');
 if(queue.length+ledger.size!==all.length){console.error('Source ledger / body mismatch: unresolved '+queue.length+' + ledger '+ledger.size+' != bodies '+all.length);process.exitCode=1;}
 if(new Set(queue.map(x=>x.id)).size!==queue.length){console.error('Duplicate unresolved ID');process.exitCode=1;}
}
