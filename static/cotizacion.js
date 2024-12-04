// Función para calcular el total de los productos seleccionados
function calcularTotal() {
    let total = 0;
    // Obtiene todos los checkboxes con la clase "producto"
    const productosSeleccionados = document.querySelectorAll('.producto:checked');
    
    // Suma el precio de los productos seleccionados
    productosSeleccionados.forEach(producto => {
        total += parseFloat(producto.value);
    });
    
    // Muestra el total en la página
    document.getElementById('total').textContent = total.toFixed(2);
}

// Función para mostrar la pasarela de pago
function mostrarPasarelaPago() {
    // Obtiene el total calculado
    const total = document.getElementById('total').textContent;
    
    // Muestra la pasarela de pago
    document.getElementById('pasarelaPago').style.display = 'block';
    
    // Actualiza el total en la pasarela de pagola funcion registrar pedido
    document.getElementById('totalPago').textContent = total;
    
    // Desactiva el botón de "Cotizar" para evitar múltiples clics
    document.getElementById('cotizar').disabled = true;
    
    // Opcional: Mostrar un mensaje de éxito o procesar el pago
}

// Llama a la función calcularTotal cada vez que un checkbox cambie
document.querySelectorAll('.producto').forEach(checkbox => {
    checkbox.addEventListener('change', calcularTotal);
});

// Llama a calcularTotal al cargar la página para asegurarse de que el total sea actualizado
calcularTotal();

// Envía los datos del pedido y la cotización
function registrarPedido() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const total = parseFloat(document.getElementById('total').textContent);

    // Crear el objeto con los datos del pedido y la cotización
    const pedidoData = {
        nombre: nombre,  // Se usará como EMPRESA_NIT
        direccion: direccion,  // Se usará como DIRECCION_ENTREGA
        valorTotal: total,  // Se usará como VALOR_TOTAL
        estado: "Pendiente",  // El estado se envía como pendiente
        fecha: new Date().toISOString().split('T')[0],  // Fecha actual en formato YYYY-MM-DD
    };

    // Enviar los datos al backend (usando fetch para POST)
    fetch('/cotizacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Pedido registrado exitosamente.");
            // Mostrar los detalles del pedido
            document.getElementById('detalles-compra').innerHTML = `
                <h3>Detalles de tu Pedido</h3>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Dirección:</strong> ${direccion}</p>
                <p><strong>Total a pagar:</strong> $${total.toFixed(2)}</p>
            `;
        } else {
            alert("Hubo un error al registrar el pedido.");
        }
    });
}