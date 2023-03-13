export default {
  publishCommand: ({ defaultCommand }) => `${defaultCommand} --access public`,
  mergeStrategy: { toSameBranch: ['master'] },
  pullRequestReviewers: ['nd0ut'],
  slack: {
    // disable slack notification for `prepared` lifecycle.
    // Ship.js will send slack message only for `releaseSuccess`.
    prepared: null
  }
}
