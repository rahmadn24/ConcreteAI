const bcrypt = require('bcryptjs');

module.exports = async function (fastify, opts) {
  const { db } = opts;

  fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({ data: { email, password: hashedPassword } });
    const token = fastify.jwt.sign({ id: user.id });
    reply.send({ token });
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      reply.code(401).send({ error: 'Invalid email or password' });
    } else {
      const token = fastify.jwt.sign({ id: user.id });
      reply.send({ token });
    }
  });
};
