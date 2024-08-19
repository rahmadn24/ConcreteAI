module.exports = async function (fastify, opts) {
    const { db } = opts;
  
    fastify.post('/send', { preHandler: [fastify.authenticate] }, async (request, reply) => {
      const { fromAccountId, toAccountId, amount } = request.body;
  
      const fromAccount = await db.paymentAccount.findUnique({ where: { id: fromAccountId } });
      if (fromAccount.balance < amount) {
        reply.code(400).send({ error: 'Insufficient funds' });
        return;
      }
  
      const transaction = await db.transaction.create({
        data: {
          fromAccountId,
          toAccountId,
          amount,
          status: 'completed'
        }
      });
  
      await db.paymentAccount.update({ where: { id: fromAccountId }, data: { balance: fromAccount.balance - amount } });
      await db.paymentAccount.update({ where: { id: toAccountId }, data: { balance: { increment: amount } } });
  
      reply.send(transaction);
    });
  
    fastify.post('/withdraw', { preHandler: [fastify.authenticate] }, async (request, reply) => {
      const { fromAccountId, amount } = request.body;
  
      const fromAccount = await db.paymentAccount.findUnique({ where: { id: fromAccountId } });
      if (fromAccount.balance < amount) {
        reply.code(400).send({ error: 'Insufficient funds' });
        return;
      }
  
      const transaction = await db.transaction.create({
        data: {
          fromAccountId,
          amount,
          status: 'completed'
        }
      });
  
      await db.paymentAccount.update({ where: { id: fromAccountId }, data: { balance: fromAccount.balance - amount } });
  
      reply.send(transaction);
    });
  };
  