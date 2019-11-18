<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'LoginController@showLoginForm');
Route::get('login', 'LoginController@showLoginForm')->name('login');
Route::post('/login/custom',
[ 
	'uses'=>'LoginController@login',
	'as'=>'login.custom'
]
);
Route::get('/login/verification', ['uses'=>'LoginController@verification', 'as'=>'verification']);
Route::post('/login/verification-code', ['uses'=>'LoginController@verify_code', 'as'=>'verification-code']);
Route::get('/login/resend-code', ['uses'=>'LoginController@resend_code', 'as'=>'resend_verification_code']);
//login routes

//logout route
Route::get('/logout', 'LoginController@logout')->name('logout');
//logout route



//forgot password routes
Route::get('/forgotpassword', 'ForgotpasswordController@forgotpassword');
Route::post('/resetemail', ['uses'=>'ForgotpasswordController@resetemail', 'as'=>'resetemail']);
Route::get('/resetpassword/{token}', ['uses'=>'ForgotpasswordController@resetpassword', 'as'=>'resetpassword']);
Route::post('/updatepassword', ['uses'=>'ForgotpasswordController@updatepassword', 'as'=>'updatepassword']);
//forgot password routes

// Company Reggistration  routes
Route::get('/register/step1', ['uses'=>'CompanyController@index', 'as'=>'step_1']);
Route::get('/register/step2', ['uses'=>'CompanyController@step2', 'as'=>'step_2']);
Route::get('/register/step3', ['uses'=>'CompanyController@step3', 'as'=>'step_3']);
Route::get('/register/step4', ['uses'=>'CompanyController@step4', 'as'=>'step_4']);
Route::post('/register/stepone', ['uses'=>'CompanyController@registercompany', 'as'=>'step1']);
Route::post('/register/steptwo', ['uses'=>'CompanyController@verify_code', 'as'=>'step2']);
Route::post('/register/stepthree', ['uses'=>'CompanyController@addcompany', 'as'=>'step3']);
Route::post('/register/stepfour', ['uses'=>'CompanyController@verify_email_code', 'as'=>'step4']);
Route::post('/register/resend-code', ['uses'=>'CompanyController@resend_code', 'as'=>'resend_code']);
Route::post('/register/edit-mobile-no', ['uses'=>'CompanyController@editmobileno', 'as'=>'edit-mobile-no']);
Route::post('/register/edit-email', ['uses'=>'CompanyController@editemail', 'as'=>'edit-email']);
Route::get('/verify', 'verifyController@verify');
Route::get('/loginUser', 'verifyController@loginUser');
Route::get('/register1', 'verifyController@Register1');
Route::get('/register2', 'verifyController@Register2');
Route::get('/register3', 'verifyController@Register3');
Route::get('/register4', 'verifyController@Register4');