from flask import Flask, request
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)


# MySQL Connection
def connect_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="12345",
        database="college_queue"
    )


# Home
@app.route("/")
def home():
    return "College Queue Management Backend is Running!"


# Generate Token
@app.route("/api/token", methods=["POST"])
def get_token():
    data = request.json

    department = data.get("department")
    email = data.get("email")

    db = connect_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM tokens WHERE department = %s",
        (department,)
    )

    count = cursor.fetchone()[0]
    token_number = count + 1

    cursor.execute(
        "INSERT INTO tokens "
        "(token_number, department, status, email) "
        "VALUES (%s, %s, %s, %s)",
        (token_number, department, "Waiting", email)
    )

    token_id = cursor.lastrowid

    db.commit()

    cursor.close()
    db.close()

    return {
        "id": token_id,
        "token": token_number,
        "department": department
    }


# Check Queue
@app.route("/api/queue/<department>")
def check_queue(department):
    db = connect_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT token_number FROM tokens "
        "WHERE department = %s AND status = 'Serving' "
        "ORDER BY id ASC LIMIT 1",
        (department,)
    )

    result = cursor.fetchone()

    cursor.close()
    db.close()

    if result:
        return {
            "token": result[0],
            "department": department
        }

    return {
        "token": 0,
        "department": department
    }


# My Token
@app.route("/api/my-token/<int:token_id>")
def my_token(token_id):
    db = connect_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT token_number, department, status "
        "FROM tokens WHERE id = %s",
        (token_id,)
    )

    result = cursor.fetchone()

    cursor.close()
    db.close()

    if result:
        return {
            "token": result[0],
            "department": result[1],
            "status": result[2]
        }

    return {
        "token": 0,
        "department": "Not Selected",
        "status": "No Token"
    }


# Login
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    # Admin Login
    if email == "admin@sgmcollege.com" and password == "1234":
        return {
            "success": True,
            "role": "admin",
            "message": "Admin Login Successful!"
        }

    # Student Login
    db = connect_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT email, role FROM users "
        "WHERE email = %s AND password = %s",
        (email, password)
    )

    result = cursor.fetchone()

    cursor.close()
    db.close()

    if result:
        return {
            "success": True,
            "role": "student",
            "email": result[0],
            "message": "Student Login Successful!"
        }

    return {
        "success": False,
        "message": "Invalid email or password"
    }


# Admin - Next Token
@app.route("/api/admin/next/<department>", methods=["PUT"])
def next_token(department):
    db = connect_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id, token_number FROM tokens "
        "WHERE department = %s AND status = 'Waiting' "
        "ORDER BY id ASC LIMIT 1",
        (department,)
    )

    result = cursor.fetchone()

    if result:
        cursor.execute(
            "UPDATE tokens SET status = 'Serving' WHERE id = %s",
            (result[0],)
        )

        db.commit()

        token = result[1]

        cursor.close()
        db.close()

        return {
            "success": True,
            "token": token,
            "message": "Next token is now serving"
        }

    cursor.close()
    db.close()

    return {
        "success": False,
        "message": "No waiting tokens"
    }


# Admin - Complete Token
@app.route("/api/admin/complete/<department>", methods=["PUT"])
def complete_token(department):
    db = connect_db()
    cursor = db.cursor()

    # Complete current serving token
    cursor.execute(
        "UPDATE tokens SET status = 'Completed' "
        "WHERE department = %s AND status = 'Serving' "
        "ORDER BY id ASC LIMIT 1",
        (department,)
    )

    db.commit()

    # Find next waiting token
    cursor.execute(
        "SELECT id, token_number FROM tokens "
        "WHERE department = %s AND status = 'Waiting' "
        "ORDER BY id ASC LIMIT 1",
        (department,)
    )

    result = cursor.fetchone()

    # Automatically start next token
    if result:
        cursor.execute(
            "UPDATE tokens SET status = 'Serving' WHERE id = %s",
            (result[0],)
        )

        db.commit()

        next_token = result[1]

        cursor.close()
        db.close()

        return {
            "success": True,
            "token": next_token,
            "message": "Token completed. Next token is now serving"
        }

    cursor.close()
    db.close()

    return {
        "success": True,
        "message": "Token completed. No more waiting tokens"
    }


# Start Server
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {
            "success": False,
            "message": "Please enter email and password"
        }

    db = connect_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        db.close()

        return {
            "success": False,
            "message": "Email already registered"
        }

    cursor.execute(
        "INSERT INTO users (email, password, role) VALUES (%s, %s, %s)",
        (email, password, "student")
    )

    db.commit()

    cursor.close()
    db.close()

    return {
        "success": True,
        "message": "Registration successful!"
    }

if __name__ == "__main__":
    app.run(debug=True)