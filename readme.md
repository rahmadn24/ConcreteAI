## Account Manager ##
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"password123"}'

curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"password123"}'

curl -H "Authorization: Bearer <your_token>" \
http://localhost:3000/accounts/

curl -H "Authorization: Bearer <your_token>" \
http://localhost:3000/accounts/<account_id>/transactions


## Payment Manager ##
curl -X POST http://localhost:3001/transaction/send \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"fromAccountId":"<from_account_id>", "toAccountId":"<to_account_id>", "amount":100.0}'

curl -X POST http://localhost:3001/transaction/withdraw \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"fromAccountId":"<from_account_id>", "amount":50.0}'

curl -H "Authorization: Bearer <your_token>" \
http://localhost:3001/transaction/<account_id>/all

