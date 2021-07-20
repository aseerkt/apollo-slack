export function requiresAuth(next) {
  return function (root, args, ctx, info) {
    if (!ctx.userId) {
      throw new Error(`Unauthenticated!`);
    }
    return next(root, args, ctx, info);
  };
}
