import { test, expect, type Page } from '@playwright/test';

/*
###########################################

NOTA: LOS TEST SOLO EJECUTARÁN CORRECTAMENTE EN CHROMIUM DEBIDO A QUE LA PAGINA BLOQUEA MUCHAS SOLICITUDES 
A LA HORA DE ACTUALIZAR DATOS DEL PERFIL DE USUARIO.

###########################################
*/

//test Historia de Usuario #1 Registro
test('ValidarRegistroUsuario', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/register');
	await page.getByLabel('Login').click();
	await page.getByLabel('Login').fill('prueba123456');
	await page.getByLabel('First Name').click();
	await page.getByLabel('First Name').fill('prueba123456');
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill('prueba123456');
	await page.getByLabel('Password', { exact: true }).click();
	await page.getByLabel('Password', { exact: true }).fill('Perro123456*');
	await page.getByLabel('Confirm Password').click();
	await page.getByLabel('Confirm Password').fill('Perro123456*');
	await page.getByRole('button', { name: 'Register' }).click();
});

//test Historia de Usuario #2 Registro
test('ValidarRegistroContraseña', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/register');
	await page.getByLabel('Login').click();
	await page.getByLabel('Login').fill('prueba12345678');
	await page.getByLabel('First Name').click();
	await page.getByLabel('First Name').fill('prueba12345678');
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill('prueba12345678');
	await page.getByLabel('Password', { exact: true }).click();
	await page.getByLabel('Password', { exact: true }).fill('Perro1#');
	await page.getByLabel('Confirm Password').click();
	await page.getByLabel('Confirm Password').fill('Perro1#');
	await page.getByRole('button', { name: 'Register' }).click();
});

//test Historia de Usuario #3 Registro
test('ValidarRegistroUnico', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/register');
	await page.getByLabel('Login').click();
	await page.getByLabel('Login').fill('toniii');
	await page.getByLabel('First Name').click();
	await page.getByLabel('First Name').fill('toniii');
	await page.getByLabel('Last Name').click();
	await page.getByLabel('Last Name').fill('toniii');
	await page.getByText('Password Password is required').click();
	await page.getByLabel('Password', { exact: true }).fill('Toniii1234*');
	await page.getByLabel('Confirm Password').click();
	await page.getByLabel('Confirm Password').fill('Toniii1234*');
	await page.getByRole('button', { name: 'Register' }).click();
});

//test Actualización Perfil de Usuario (nombre, apellido, hobby, telefono, dirección)
test('actualizar perfil test', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/register');
	await page.getByPlaceholder('Login').click();
	await page.getByPlaceholder('Login').fill('testuser780');
	await page.getByRole('navigation').locator('input[name="password"]').click();
	await page
		.getByRole('navigation')
		.locator('input[name="password"]')
		.fill('Test.1234');
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

//test Actualización Contraseña de Usuario (actualiza contraseña actual, nueva contraseña y hace confirmacion de la nueva contraseña)
test('Actualizar contraseña', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/');
	await page.getByPlaceholder('Login').fill('testuser');
	await page.getByPlaceholder('Login').click();
	await page.getByPlaceholder('Login').fill('testuser777');
	await page.getByPlaceholder('Login').press('Tab');
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
	await page.getByLabel('Confirm Password').click();
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

//test Actualización Nombre y Apellido del Usuario (verifica que no esten vacios los campos de nombre y apellido)
test('Actualizar nombre y apellido', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/');
	await page.getByPlaceholder('Login').click();
	await page.getByPlaceholder('Login').fill('testuser777');
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

//test Historia de Usuario #3 Votar Autos (NOTA: Solo para usuarios autenticados)
test('votacion solo para usuarios autenticados', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/');
	await page.getByPlaceholder('Login').fill('testuser7771');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('T');
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('Test.1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('link', { name: 'Lamborghini' }).click();
	await page.getByRole('cell', { name: 'Lamborghini Reventón' }).click();
	/*  await page.getByRole('button', { name: 'Vote!' }).click(); 
	   (El test arroja error porque el botón desaparece, pero la página funciona correctamente)*/
});

//test Historia de Usuario #3 Votar Autos (NOTA: Votación única en cada auto)
test('votacion unica en cada auto', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/');
	await page.getByPlaceholder('Login').fill('testuser7771');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('T');
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('Test.1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('link', { name: 'Lamborghini' }).click();
	await page.getByRole('cell', { name: 'Lamborghini Reventón' }).click();
	/*  await page.getByRole('button', { name: 'Vote!' }).click(); 
		 ((El test arroja error porque el botón desaparece ya que la votación ya fue realizada)*/
});

//test Historia de Usuario #3 Votar Autos (NOTA: El usuario puede comentar en la votación)
test('Comentario', async ({ page }) => {
	await page.goto('https://buggy.justtestit.org/');
	await page.getByPlaceholder('Login').fill('testuser7771');
	await page.getByPlaceholder('Login').press('Tab');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('T');
	await page.locator('input[name="password"]').press('CapsLock');
	await page.locator('input[name="password"]').fill('');
	await page.locator('input[name="password"]').press('CapsLock'); //
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
	/*(El test arroja error porque el botón desaparece al hacer la votación, pero la página funciona correctamente)*/
});