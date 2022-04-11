``` shell
# client call
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{customers {name}}"}' \
http://localhost:4000/graphql
```