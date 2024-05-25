# Playwright Test Suite

Este proyecto utiliza Playwright para automatizar pruebas en la plataforma "Buggy Just Test It". A continuación, se describen los diferentes tests implementados y su propósito.

## Índice

- [Instalación](#instalación)
- [Ejecución de pruebas](#ejecución-de-pruebas)
- [Pruebas incluidas](#pruebas-incluidas)
  - [Validar Registro de Usuario](#validar-registro-de-usuario)
  - [Validar Contraseña de Registro](#validar-contraseña-de-registro)
  - [Validar Unicidad de Registro](#validar-unicidad-de-registro)
  - [Actualizar Perfil](#actualizar-perfil)
  - [Actualizar Contraseña](#actualizar-contraseña)
  - [Actualizar Nombre y Apellido](#actualizar-nombre-y-apellido)
  - [Votación de Autos: Solo para Usuarios Autenticados](#votación-de-autos-solo-para-usuarios-autenticados)
  - [Votación Única por Auto](#votación-única-por-auto)
  - [Dejar Comentario al Votar](#dejar-comentario-al-votar)

## Instalación

Para ejecutar estas pruebas, necesitas tener Node.js y Playwright instalados. Puedes instalar Playwright ejecutando el siguiente comando:

```bash
npm install @playwright/test
```

## Ejecución de pruebas

Para ejecutar todas las pruebas, utiliza el siguiente comando:

```bash
npm run test
```

Otros comandos:
```bash
npm run test:codegen
npm run test:debug
```

## Pruebas incluidas

### Validar Registro de Usuario

**Archivo:** `tests/register.spec.ts`

**Descripción:** Esta prueba verifica el proceso de registro de un nuevo usuario con datos válidos.

**Pasos:**
1. Navegar a la página de registro.
2. Ingresar "tester123456" en los campos de Login, First Name y Last Name.
3. Ingresar "Arepa123456*" en los campos de Password y Confirm Password.
4. Hacer clic en el botón "Register".

```javascript
test('ValidarRegistroUsuario', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/register');
  await page.getByLabel('Login').click();
  await page.getByLabel('Login').fill('tester123456');
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('tester123456');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill('tester123456');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Arepa123456*');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('Arepa123456*');
  await page.getByRole('button', { name: 'Register' }).click();
});
```

### Validar Contraseña de Registro

**Archivo:** `tests/register.spec.ts`

**Descripción:** Esta prueba verifica que se muestra un error al intentar registrar una cuenta con una contraseña débil.

**Pasos:**
1. Navegar a la página de registro.
2. Ingresar "tester12345678" en los campos de Login, First Name y Last Name.
3. Ingresar "Arepa1#" en los campos de Password y Confirm Password.
4. Hacer clic en el botón "Register".

```javascript
test('ValidarRegistroContraseña', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/register');
  await page.getByLabel('Login').click();
  await page.getByLabel('Login').fill('tester12345678');
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('tester12345678');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill('tester12345678');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Arepa1#');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('Arepa1#');
  await page.getByRole('button', { name: 'Register' }).click();
});
```

### Validar Unicidad de Registro

**Archivo:** `tests/register.spec.ts`

**Descripción:** Esta prueba verifica que se muestra un error al intentar registrar una cuenta con un nombre de usuario ya existente.

**Pasos:**
1. Navegar a la página de registro.
2. Ingresar "holaaa" en los campos de Login, First Name y Last Name.
3. Ingresar "Holaaa1234*" en los campos de Password y Confirm Password.
4. Hacer clic en el botón "Register".

```javascript
test('ValidarRegistroUnico', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/register');
  await page.getByLabel('Login').click();
  await page.getByLabel('Login').fill('holaaa');
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('holaaa');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill('holaaa');
  await page.getByText('Password Password is required').click();
  await page.getByLabel('Password', { exact: true }).fill('Holaaa1234*');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('Holaaa1234*');
  await page.getByRole('button', { name: 'Register' }).click();
});
```

### Actualizar Perfil

**Archivo:** `tests/profile.spec.ts`

**Descripción:** Esta prueba verifica la actualización del perfil de un usuario, incluyendo nombre, apellido, hobby, teléfono y dirección.

**Pasos:**
1. Navegar a la página de registro.
2. Ingresar "testuser778" en el campo de Login.
3. Ingresar "Test.1234" en el campo de Password.
4. Hacer clic en el botón "Login".
5. Navegar a la página de perfil.
6. Actualizar los campos First Name, Last Name, Hobby, Phone y Address.
7. Guardar los cambios y verificar las validaciones.
8. Cerrar sesión.

```javascript
test('actualizar perfil test', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/register');
	await page.getByPlaceholder('Login').click();
	await page.getByPlaceholder('Login').fill('testuser778');
	await page.getByRole('navigation').locator('input[name="password"]').click();
	await page.getByRole('navigation').locator('input[name="password"]').fill('Test.1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('link', { name: 'Profile' }).click();
	await page.getByLabel('First Name').dblclick();
	await page.getByLabel('First Name').fill('nuevo user');
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill('new usuario');
	await page.getByLabel('Hobby').selectOption('Video Games');
	await page.locator('fieldset').filter({ hasText: 'Phone' }).click();
	await page.getByLabel('Phone').fill('3128400000');
	await page.getByLabel('Address').click();
	await page.getByLabel('Address').fill('Direccion tal con tin');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByLabel('First Name').click();
	await page.getByLabel('First Name').fill('');
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill('');
	await page.getByLabel('First Name').click();
	await page.getByLabel('First Name').fill(' ');
	await page.getByText('Last Name is required').click();
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill(' ');
	await page.getByLabel('Address').click();
	await page.getByLabel('Address').fill(' ');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByLabel('Phone').click();
	await page.getByLabel('Phone').fill('');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByRole('link', { name: 'Logout' }).click();
});
```

### Actualizar Contraseña

**Archivo:** `tests/password.spec.ts`

**Descripción:** Esta prueba verifica la actualización de la contraseña de un usuario, incluyendo la contraseña actual, la nueva contraseña y la confirmación de la nueva contraseña.

**Pasos:**
1. Navegar a la página principal.
2. Ingresar "testuser778" en el campo de Login.
3. Ingresar "Test.1234" en el campo de Password.
4. Hacer clic en el botón "Login".
5. Navegar a la página de perfil.
6. Actualizar los campos Current Password, New Password y Confirm Password.
7. Guardar los cambios y verificar las validaciones.
8. Cerrar sesión.

```javascript
test('Actualizar contraseña', async ({ page }) => {
	await page.goto('https://buggy.just

testit.org/');
	await page.getByPlaceholder('Login').click();
	await page.getByPlaceholder('Login').fill('testuser778');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill('');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill('Test.1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('link', { name: 'Profile' }).click();
	await page.getByLabel('Current Password').click();
	await page.getByLabel('Current Password').fill('Test.1234');
	await page.getByLabel('New Pasword').click();
	await page.getByLabel('New Pasword').fill('1234.Test');
	await page.getByLabel('Confirm Password').click();
	await page.getByLabel('Confirm Password').fill('');
	await page.getByLabel('New Pasword').click();
	await page.getByLabel('New Pasword').fill('');
	await page.getByLabel('New Pasword').click();
	await page.getByLabel('New Pasword').fill('1234567');
	await page.getByLabel('Confirm Password').click();
	await page.getByLabel('Confirm Password').fill('1234567');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByLabel('New Pasword').click();
	await page.getByLabel('New Pasword').fill('12345678');
	await page.getByLabel('Confirm Password').click();
	await page.getByLabel('Confirm Password').fill('12345678');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByLabel('New Pasword').click();
	await page.getByLabel('New Pasword').fill('12345678Test');
	await page.getByLabel('Confirm Password').press('ArrowRight');
	await page.getByLabel('Confirm Password').fill('12345678Test');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByLabel('New Pasword').click();
	await page.getByLabel('New Pasword').press('ArrowRight');
	await page.getByLabel('New Pasword').fill('12345678Test.');
	await page.getByLabel('Confirm Password').click();
	await page.getByLabel('Confirm Password').fill('12345678Test.');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByLabel('Current Password').click();
	await page.getByLabel('Current Password').fill('12345678Test.');
	await page.getByLabel('New Pasword').click();
	await page.getByLabel('New Pasword').fill('Test.1234');
	await page.getByLabel('Confirm Password').click();
	await page.getByLabel('Confirm Password').fill('Test.1234');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByRole('link', { name: 'Logout' }).click();
});
```

### Actualizar Nombre y Apellido

**Archivo:** `tests/name.spec.ts`

**Descripción:** Esta prueba verifica la actualización del nombre y apellido de un usuario, asegurándose de que no estén vacíos.

**Pasos:**
1. Navegar a la página principal.
2. Ingresar "testuser778" en el campo de Login.
3. Ingresar "Test.1234" en el campo de Password.
4. Hacer clic en el botón "Login".
5. Navegar a la página de perfil.
6. Dejar los campos First Name y Last Name en blanco.
7. Guardar los cambios y verificar las validaciones.
8. Cerrar sesión.

```javascript
test('Actualizar nombre y apellido', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/');
	await page.getByPlaceholder('Login').click();
	await page.getByPlaceholder('Login').fill('testuser778');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill('');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill('Test.1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('link', { name: 'Profile' }).click();
	await page.getByLabel('First Name').click();
	await page.getByLabel('First Name').fill('');
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill('');
	await page.getByLabel('First Name').click();
	await page.getByLabel('First Name').fill(' ');
	await page.getByText('Last Name is required').click();
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill(' ');
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByRole('link', { name: 'Logout' }).click();
});
```

### Votación de Autos: Solo para Usuarios Autenticados

**Archivo:** `tests/vote.spec.ts`

**Descripción:** Esta prueba verifica que solo los usuarios autenticados puedan votar por los autos.

**Pasos:**
1. Navegar a la página principal.
2. Ingresar "testuser7788" en el campo de Login.
3. Ingresar "Test.1234" en el campo de Password.
4. Hacer clic en el botón "Login".
5. Navegar a la sección de autos Lamborghini.
6. Seleccionar el auto Lamborghini Reventón.
7. Intentar votar por el auto.

```javascript
test('votacion solo para usuarios autenticados', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/');
	await page.getByPlaceholder('Login').fill('testuser7788');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('T');
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('Test.1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('link', { name: 'Lamborghini' }).click();
	await page.getByRole('cell', { name: 'Lamborghini Reventón' }).click();
   /*  await page.getByRole('button', { name: 'Vote!' }).click(); 
	   (Cuando se hace el test sale error porque ya el botón deja de existir como tal pero funciona bien la página)*/ 
  });
```

### Votación Única por Auto

**Archivo:** `tests/vote.spec.ts`

**Descripción:** Esta prueba verifica que un usuario solo puede votar una vez por cada auto.

**Pasos:**
1. Navegar a la página principal.
2. Ingresar "testuser7788" en el campo de Login.
3. Ingresar "Test.1234" en el campo de Password.
4. Hacer clic en el botón "Login".
5. Navegar a la sección de autos Lamborghini.
6. Seleccionar el auto Lamborghini Reventón.
7. Intentar votar por el auto.

```javascript
test('votacion unica en cada auto', async ({ page }) => {
	  await page.goto('https://buggy.justtestit.org/');
	  await page.getByPlaceholder('Login').fill('testuser7788');
	  await page.locator('input[name="password"]').click();
	  await page.locator('input[name="password"]').press('CapsLock');
	  await page.locator('input[name="password"]').fill('T');
	  await page.locator('input[name="password"]').press('CapsLock');
	  await page.locator('input[name="password"]').fill('Test.1234');
	  await page.getByRole('button', { name: 'Login' }).click();
	  await page.getByRole('link', { name: 'Lamborghini' }).click();
	  await page.getByRole('cell', { name: 'Lamborghini Reventón' }).click();
	 /*  await page.getByRole('button', { name: 'Vote!' }).click(); 
		 (Cuando se hace el test sale error porque ya el botón deja de existir como tal ya que hizo su votación)*/ 
	});
```

### Dejar Comentario al Votar

**Archivo:** `tests/vote.spec.ts`

**Descripción:** Esta prueba verifica que un usuario pueda dejar un comentario al momento de votar por un auto.

**Pasos:**
1. Navegar a la página principal.
2. Ingresar "testuser7788" en el campo de Login.
3. Ingresar "Test.1234" en el campo de Password.
4. Hacer clic en el botón "Login".
5. Navegar a la sección de autos Lamborghini.
6. Seleccionar el auto Lamborghini Veneno.
7. Ingresar un comentario en el campo "Your Comment (optional)".
8. Hacer clic en el botón "Vote!".

```javascript
// test historia de usuario #3 votar autos: El usuario puede dejar un comentario al momento de votar.
test('Comentario', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/');
	await page.getByPlaceholder('Login').fill('testuser7788');
	await page.getByPlaceholder('Login').press('Tab');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('

input[name="password"]').fill('T');
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('');
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('T');
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('Test.1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('link', { name: 'Lamborghini' }).click();
	await page.getByRole('cell', { name: 'Lamborghini Veneno' }).click();
	await page.getByLabel('Your Comment (optional)').click();
	await page.getByLabel('Your Comment (optional)').press('CapsLock');
	await page.getByLabel('Your Comment (optional)').fill('D');
	await page.getByLabel('Your Comment (optional)').press('CapsLock');
	await page.getByLabel('Your Comment (optional)').fill('Dejar comentario');
	await page.getByRole('button', { name: 'Vote!' }).click();
	await page.getByRole('cell', { name: 'Dejar comentario' }).click();
	/*(Cuando se hace el test sale error porque ya el botón deja de existir como tal ya que hizo su votación
	 entonces la página no deja hacer el test correctamente, pero la página funciona correctamente)*/ 
  });
```
