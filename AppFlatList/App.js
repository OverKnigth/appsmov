import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useState } from "react";

//Lista de Objetos
let productos = [
  {
    id: 1,
    nombre: "Gomitas",
    categoria: "Golosinas",
    precioCompra: 0.3,
    precioVenta: 0.5,
  },
  {
    id: 2,
    nombre: "Chifles",
    categoria: "Snacks",
    precioCompra: 0.6,
    precioVenta: 1,
  },
  {
    id: 3,
    nombre: "Coca Cola",
    categoria: "Gaseosas",
    precioCompra: 0.25,
    precioVenta: 0.5,
  },
  {
    id: 4,
    nombre: "Chicles",
    categoria: "Golosinas",
    precioCompra: 0.05,
    precioVenta: 0.15,
  },
  {
    id: 5,
    nombre: "Doritos",
    categoria: "Snacks",
    precioCompra: 0.25,
    precioVenta: 0.6,
  },
];

//Variable para saber si es nuevo o se va a editar
let nuevo = true;
//Variable que almacena el indice del arreglo seleccionado
let indiceSeleccionado = -1;

export default function App() {
  //Agregar un Producto
  const [id, setid] = useState("");
  const [product, setproduct] = useState("");
  const [categoria, setcategoria] = useState("");
  const [precioC, setprecioC] = useState("");
  const [precioV, setprecioV] = useState("");
  //Saber el numero de elementos
  const [elementos, setelementos] = useState(productos.length);

  let limpiar = () => {
    setproduct(null);
    setid(null);
    setcategoria(null);
    setprecioC(null);
    setprecioV(null);
    nuevo = true;
  };

  let existeProducto = () => {
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id == id) {
        return true;
      }
    }
    return false;
  };

  let validaciones = () => {
    if (id == "") {
      alert("El id no puede estar vacio");
      return false;
    }
    if (isNaN(id)) {
      alert("El id debe ser numerico");
      return false;
    }
    if (product == "") {
      alert("Ingresa un nombre, por favor");
      return false;
    }
    if (categoria == "") {
      alert("Ingresa una categoria, por favor");
      return false;
    }
    if (precioC == "") {
      alert("El precio no puede estar vacio");
      return false;
    }
    if (isNaN(precioC)) {
      alert("Ingresa un precio valido");
      return false;
    }
    return true;
  };

  let agregarProducto = () => {
    //Validaciones
    if (!validaciones()) {
      return;
    }
    if (nuevo) {
      //Verificar si el id ya existe
      if (existeProducto()) {
        alert("El id ya existe");
        return;
      }
      //Agregar el producto
      let nuevoProducto = {
        id: id,
        nombre: product,
        categoria: categoria,
        precioCompra: precioC,
        precioVenta: precioV,
      };
      productos.push(nuevoProducto);
      setelementos(elementos + 1);
      //Editar si hay un producto seleccionado
    } else {
      productos[indiceSeleccionado].nombre = product;
      productos[indiceSeleccionado].categoria = categoria;
      productos[indiceSeleccionado].precioCompra = precioC;
      productos[indiceSeleccionado].precioVenta = precioV;
    }
    limpiar();
  };

  //Props
  let ItemProducto = (props) => {
    return (
      <View style={styles.items}>
        <View style={styles.item}>
          <View style={styles.codigo}>
            <Text style={styles.id}>{props.producto.id}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.nombres}>{props.producto.nombre}</Text>
            <Text style={styles.cat}>{props.producto.categoria}</Text>
          </View>
          <View style={styles.codigo}>
            <Text style={styles.precio}>${props.producto.precioVenta}</Text>
          </View>
        </View>
        <View style={styles.btn}>
          <Button
            title=" E "
            color="green"
            onPress={() => {
              setid(props.producto.id.toString());
              setproduct(props.producto.nombre);
              setcategoria(props.producto.categoria);
              setprecioC(props.producto.precioCompra.toString());
              setprecioV(props.producto.precioVenta.toString());
              nuevo = false;
              indiceSeleccionado = props.indice;
            }}
          />
          <Button
            title=" X "
            color="red"
            onPress={() => {
              indiceSeleccionado = props.indice;
              productos.splice(indiceSeleccionado, 1);
              setelementos(productos.length);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Productos</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa un ID"
          value={id}
          keyboardType="numeric"
          onChangeText={(txt) => {
            setid(txt);
          }}
          editable={nuevo}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa un producto"
          value={product}
          onChangeText={(txt) => {
            setproduct(txt);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa una categoria"
          value={categoria}
          onChangeText={(txt) => {
            setcategoria(txt);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa un precio de compra"
          value={precioC}
          keyboardType="numeric"
          onChangeText={(txt) => {
            setprecioC(txt);
            let compra = parseFloat(txt);
            if (!isNaN(compra)) {
              let venta = compra * 1.2;
              let ventaF = venta.toFixed(2);
              setprecioV(ventaF);
            } else {
              setprecioV("");
            }
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa un precio de venta"
          value={precioV}
          keyboardType="numeric"
          editable={false}
        />
        <View style={styles.botones}>
          <Button title="Guardar" onPress={agregarProducto} />
          <Button title="Nuevo" onPress={limpiar} />
          <Text style={styles.txt}>Productos: {elementos}</Text>
        </View>
      </View>
      <FlatList
        data={productos}
        renderItem={(producto) => {
          return (
            <ItemProducto indice={producto.index} producto={producto.item} />
          );
        }}
      />
      <View style={styles.footer}>
        <Text style={styles.txt}>Autor: Stalin Moposita</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  cabecera: {
    marginTop: 50,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
  },
  nombres: {
    fontSize: 15,
    fontWeight: "bold",
  },
  precios: {
    fontSize: 15,
    fontStyle: "italic",
  },
  items: {
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    borderColor: "#A8DF8E",
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#F0FFDF",
    padding: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    alignItems: "center",
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  codigo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  id: {
    fontSize: 40,
    fontStyle: "italic",
    marginRight: 20,
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cat: {
    fontSize: 15,
    fontStyle: "italic",
  },
  precio: {
    fontSize: 25,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  txt: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
