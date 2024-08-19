const Fastify = require('fastify');
const prisma = require('@prisma/client').PrismaClient;
const AuthRoutes = require('./routes/auth');
const AccountRoutes = require('./routes/accounts');

const app = Fastify();
const db = new prisma();

app.register(require('@fastify/jwt'), { secret: 'supersecret' });

app.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

app.register(AuthRoutes, { prefix: '/auth', db });
app.register(AccountRoutes, { prefix: '/accounts', db });

app.listen({ port: 3000 }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server listening on http://localhost:3000');
});
