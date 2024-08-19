module.exports = async function (fastify, opts) {
    const { db } = opts;
  
    fastify.get('/', { preHandler: [fastify.authenticate] }, async (request, reply) => {
      const userId = request.user.id;
      const accounts = await db.paymentAccount.findMany({ where: { userId } });
      reply.send(accounts);
    });
  
    fastify.get('/:accountId/transactions', { preHandler: [fastify.authenticate] }, async (request, reply) => {
      const { accountId } = request.params;
      const histories = await db.paymentHistory.findMany({ where: { paymentAccountId: accountId } });
      reply.send(histories);
    });
  };
  