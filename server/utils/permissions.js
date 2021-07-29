export function requiresAuth(next) {
  return function (root, args, ctx, info) {
    if (!ctx.userId) {
      throw new Error(`Unauthenticated!`);
    }
    return next(root, args, ctx, info);
  };
}

export function isTeamOwner(next) {
  return requiresAuth(async function (root, args, ctx, info) {
    const member = await ctx.db.Member.findOne({
      where: { teamId: args.teamId, userId: ctx.userId },
    });
    if (member.role !== 'OWNER') {
      throw new Error('Unauthorized!');
    }
    return next(root, args, ctx, info);
  });
}

export function isTeamMember(next) {
  return requiresAuth(async function (root, args, ctx, info) {
    const member = await ctx.db.Member.findOne({
      where: { teamId: args.teamId, userId: ctx.userId },
    });
    if (!member) {
      throw new Error('Unauthorized!');
    }
    return next(root, args, ctx, info);
  });
}
