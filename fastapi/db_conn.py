import psycopg2

conn = None

def get_postgres_conn():
    global conn
    if conn is None:
        conn = psycopg2.connect(host='host.docker.internal',
                                port=5432,
                                user='postgres',
                                password='password',
                                database='postgres')
    return conn