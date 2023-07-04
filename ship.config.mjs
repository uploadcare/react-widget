export default {
  publishCommand: ({ defaultCommand }) => `${defaultCommand} --access public`,
  mergeStrategy: { toSameBranch: ['master'] },
  pullRequestReviewers: ['nd0ut']
}
