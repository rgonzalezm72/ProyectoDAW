import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IArticulo} from "../interfaces/i-articulo";
import {IUsuario} from "../interfaces/i-usuario";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router, private cookies: CookieService, private http: HttpClient) {
  }

  private URLArticulos = 'https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/articulos.json';

  private URLUsuarios = 'https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json';

  // @ts-ignore
  token: string;

  // @ts-ignore
  idUsuario: string;

  /**
   * Método que sirve para que el usuario inicie sesión introduciendo el email y la contraseña
   * @param email - Email del usuario registrado
   * @param password - Contraseña del usuario registrado
   */
  iniciarSesion(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser?.getIdToken().then(
          token => {
            this.token = token;
            this.cookies.set("token", this.token);
            // @ts-ignore
            this.idUsuario = firebase.auth().currentUser?.uid;
            this.router.navigate(['/']);
          }
        );
      }
    ).catch(() => {
      alert("Usuario o contraseña incorrectos");
    });
  }

  /**
   * Método que obtiene el token en las cookies
   */
  getIdToken() {
    return this.cookies.get("token");
  }

  /**
   * Método que comprueba si el usuario está logueado obteniendo el token en las cookies
   */
  estaLogueado() {
    return this.cookies.get("token");
  }

  /**
   * Método que sirve para que el usuario cierre sesión borrando el token en las cookies
   */
  cerrarSesion() {
    firebase.auth().signOut().then(() => {
      this.token = "";
      this.cookies.set("token", this.token);
      this.router.navigate(['/']);
    })
  }

  /**
   * Método para que el usuario se pueda registrar, inscribe los datos necesarios en el Authentication y la Realtime Database en Firebase
   * @param nombre - Nombre del usuario
   * @param apellidos - Apellidos del usuario
   * @param email - Email del usuario
   * @param password - Contraseña del usuario
   * @param rol - Rol del usuario
   */
  registrarUsuario(nombre: string, apellidos: string, email: string, password: string, rol: string) {
    if (nombre === "" || apellidos === "" || email === "" || password === "") {
      alert("Debes rellenar todos los campos del formulario");
      this.router.navigate(['/registro']);
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        response => {
          firebase.auth().currentUser?.getIdToken().then(
            token => {
              this.token = token;
              this.cookies.set("token", this.token);
              // @ts-ignore
              this.idUsuario = firebase.auth().currentUser?.uid;
              firebase.database().ref().child("usuarios").child(this.idUsuario).set({
                apellidos: apellidos,
                email: email,
                id: firebase.auth().currentUser?.uid,
                nombre: nombre,
                password: password,
                rol: rol
              });
              this.router.navigate(['/']);
            }
          );
        }
      );
    }
  }

  /**
   * Método que sirve para editar los usuarios que sean admins, funciona como el método registrarUsuario()
   * pero añade el modificar el ID de usuario a los artículos de ese admin
   * @param nombre - Nombre del admin
   * @param apellidos - Apellidos del admin
   * @param email - Email del admin
   * @param password - Contraseña del admin
   * @param rol - Rol del admin
   * @param antiguoIdusuario - Antiguo ID del admin
   */
  editarAdmin(nombre: string, apellidos: string, email: string, password: string, rol: string, antiguoIdusuario: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser?.getIdToken().then(
          token => {
            this.token = token;
            this.cookies.set("token", this.token);
            // @ts-ignore
            this.idUsuario = firebase.auth().currentUser?.uid;
            firebase.database().ref().child("usuarios").child(this.idUsuario).set({
              apellidos: apellidos,
              email: email,
              id: firebase.auth().currentUser?.uid,
              nombre: nombre,
              password: password,
              rol: rol
            });
            this.getArticulos().subscribe(articulos => {
              for (let articulo of articulos) {
                if (articulo.idAutor === antiguoIdusuario) {
                  firebase.database().ref().child("articulos").child(articulo.id.toString()).update({
                    idAutor: this.idUsuario
                  });
                }
              }
            });
            this.router.navigate(['/']);
          }
        );
      }
    );
  }

  /**
   * Método que sirve para configurar cualquier tipo de usuario, ya sea un usuario normal o un admin, comprobando
   * que los campos del formulario no estén vacíos y borrando el inscibiendo de nuevo al usuario automáticamente
   * con los nuevos datos
   * @param nombre
   * @param apellidos
   * @param email
   * @param password
   */
  configurarUsuario(nombre: string, apellidos: string, email: string, password: string) {
    if (nombre === "" || apellidos === "" || email === "" || password === "") {
      alert("Debes rellenar todos los campos del formulario");
      this.router.navigate(['/']);
      this.router.navigate(['/configuracion']);
    } else {
      // @ts-ignore
      this.idUsuario = firebase.auth().currentUser?.uid;
      this.getUsuario(this.idUsuario).subscribe(usuario => {
        if (usuario.rol === "admin") {
          this.borrarUsuario();
          this.editarAdmin(nombre, apellidos, email, password, "admin", this.idUsuario);
        } else {
          this.borrarUsuario();
          this.registrarUsuario(nombre, apellidos, email, password, "usuario");
        }
      }, error => console.log(error), () => console.log('Fin de observable'));
    }
  }

  /**
   * Método que sirve para el usuario pueda eliminar su cuenta de la página web
   * borrando el usuario tanto del Authentication como de la Realtime Database de Firebase
   */
  borrarUsuario() {
    // @ts-ignore
    this.idUsuario = firebase.auth().currentUser?.uid;
    firebase.database().ref().child("usuarios").child(this.idUsuario).remove();
    firebase.auth().currentUser?.delete();
    this.token = "";
    this.cookies.set("token", this.token);
    this.router.navigate(['/']);
  }

  /**
   * Método para obtener todos los artículos
   */
  getArticulos(): Observable<IArticulo[]> {
    return this.http.get<IArticulo[]>(this.URLArticulos);
  }

  /**
   * Método para obtener un único artículo dado el id de ese artículo
   * @param id - ID del artículo que se desea obtener
   */
  getArticulo(id: string): Observable<IArticulo> {
    return this.http.get<IArticulo>('https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/articulos/' + id + ".json");
  }

  /**
   * Método para obtener todos los usuarios
   */
  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.URLUsuarios);
  }

  /**
   * Método para obtener un único usuario dado el id de ese usuario
   * @param id - ID del usuario que se desea obtener
   */
  getUsuario(id: string): Observable<IUsuario> {
    return this.http.get<IUsuario>('https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/usuarios/' + id + ".json");
  }

  /**
   * Método que sirve para subir los artículos que los admins escriben en la propia web
   * @param titulo - Título del artículo
   * @param categoria - Categoría del artículo
   * @param contenido - Contenido del artículo
   * @param numeroArticulos - Número de artículos que tiene la página con el cual obtener el ID del nuevo artículo
   */
  subirArticulo(titulo: string, categoria: string, contenido: string, numeroArticulos: number) {
    firebase.database().ref().child("articulos").child((numeroArticulos).toString()).set({
      contenido: contenido.split('\n'),
      id: (numeroArticulos).toString(),
      idAutor: firebase.auth().currentUser?.uid,
      seccion: categoria,
      titulo: titulo
    });
    this.router.navigate(['/']);
  }
}
