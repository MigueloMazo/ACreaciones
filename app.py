from flask import Flask, request, jsonify, render_template
from flask_mysqldb import MySQL
import json
from datetime import datetime

app = Flask(__name__)

# Configuración de MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'pon tu usuario'
app.config['MYSQL_PASSWORD'] = 'pon tu clave'
app.config['MYSQL_DB'] = 'sistema_logistico'

mysql = MySQL(app)

@app.route('/')
def index():
    cur = mysql.connection.cursor()
    cur.execute("SELECT nombre, precio FROM producto")
    productos = cur.fetchall()  # Recupera todos los productos
    return render_template('cotizacion.html', productos=productos)

@app.route('/cotizacion', methods=['POST'])
def registrar_pedido():
    if request.method == 'POST':
        data = request.get_json()

        # Extraer datos del JSON recibido
        empresa_nit = data['nombre']
        direccion_entrega = data['direccion']
        valor_total = data['valorTotal']
        fecha = data['fecha']
        estado = "Pendiente"  # El estado se establece siempre como "Pendiente"

        cur = mysql.connection.cursor()

        # Guardar los datos en la tabla 'pedido'
        cur.execute('''
            INSERT INTO pedido (EMPRESA_NIT, VALOR_TOTAL, DIRECCION_ENTREGA, FECHA, ESTADO)
            VALUES (%s, %s, %s, %s, %s)
        ''', (empresa_nit, valor_total, direccion_entrega, fecha, estado))
        mysql.connection.commit()

        cur.close()

    return jsonify({"success": True})


if __name__ == '__main__':
    app.run(debug=True)
