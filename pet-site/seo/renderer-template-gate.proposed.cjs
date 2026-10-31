/** Draft-only renderer-template version binding.
 * This deliberately accepts the exact renderer source from a trusted build step,
 * NOT a hash supplied by an approval JSON record.
 */
const {createHash} = require('node:crypto');
function rendererTemplateSha256(source) {
  if (typeof source !== 'string' || !source.length) return null;
  return createHash('sha256').update(source,'utf8').digest('hex');
}
function templateVersionApproved(record, currentTemplateSha256) {
  return Boolean(record &&
    typeof currentTemplateSha256 === 'string' && /^[a-f0-9]{64}$/.test(currentTemplateSha256) &&
    record.rendererTemplateSha256 === currentTemplateSha256 &&
    record.medicalReview?.rendererTemplateSha256 === currentTemplateSha256 &&
    record.founderPublishRendererTemplateSha256 === currentTemplateSha256 &&
    record.founderIndexRendererTemplateSha256 === currentTemplateSha256);
}
module.exports = {rendererTemplateSha256,templateVersionApproved};
