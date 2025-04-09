# Sistema de Autenticación con Arquitectura Hexagonal

Este proyecto es un sistema de autenticación que incluye rutas protegidas y soporte para roles de usuario.

Está desarrollado utilizando **NestJS** y varias librerías que facilitaron el proceso de desarrollo. Sin embargo, lo realmente importante es que implementé **arquitectura hexagonal**, lo cual permite una mejor organización del código, manteniendo separadas las responsabilidades de manera correcta.

Una gran ventaja de usar esta arquitectura es la **facilidad para migrar a otro framework**: simplemente cambiando la capa de infraestructura, sin tocar la lógica de dominio o aplicación. En los módulos de dominio y aplicación no se utilizan librerías externas, evitando dependencias innecesarias.

---

## Rutas disponibles

### Registro
**POST** `/auth/register`

**Body:**
```json
{
  "name": "Test",
  "email": "test@g.com",
  "password": "12345678",
  "role": "User"
}
```
**Respuesta:**  
`Status: 201 - void`

---

### Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "test@g.com",
  "password": "12345678"
}
```
**Respuesta:**  
`Status: 200 - void`

---

### Logout
**POST** `/auth/logout`

**Body:**
```json
{}
```
**Respuesta:**  
`Status: 200 - token`

---

### Ruta Protegida
**GET** `/auth/protected`

(Se debe enviar la cookie de autenticación)

**Body:**
```json
{}
```
**Respuesta:**  
`Status: 200 - void`

---

## Notas adicionales

También implementé rutas para hacer un **CRUD de usuarios** con fines de práctica.  
Sin embargo, **desactivé la integración de este CRUD en el módulo principal**, ya que no es una buena idea exponer un recurso tan crítico de manera tan accesible.

Si deseas utilizar el CRUD de usuarios, simplemente **descomenta el import** y agrégalo a la configuración de los imports del módulo principal.

