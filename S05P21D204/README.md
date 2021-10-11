# SSAFY Bigdata project

### Our default branch is develop branch.


## How to Run

### ISEAU

```sh
cd backend
pip install -r requirements.txt
python parse.py
python analyze.py
python visualize.py
```


**Backend**

```sh
cd ISEAU/backend
pip install -r requirements.txt
python manage.py runserver
```

**Frontend**

```sh
cd ISEAU/frontend
yarn install
yarn dev
```

### database connection

- DB hostname : iseau
- id : root
- pw : j5d204
- port : 3306

- 도커 컨테이너 생성시 볼륨 마운트
