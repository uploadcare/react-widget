export default {
  publishCommand: ({ tag }) => `npm stage publish --tag ${tag}`,
  mergeStrategy: { toSameBranch: ['master'] },
  pullRequestReviewers: ['nd0ut']
}
