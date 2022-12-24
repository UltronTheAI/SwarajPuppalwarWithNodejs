import requests as r
import json

url = 'http://localhost:5000/api.blogs'
def post(title: str, snippet: str, body: str, image: str, date: str):
    data = {}
    data['title'] = title
    data['snippet'] = snippet
    data['body'] = body
    data['image'] = image
    data['date'] = date
    data['password'] = 'ultron4554'
    return r.get(f'{url}.add?{json.dumps(data)}')

print(post('title', 'snippet', 'body', 'image', 'date'))