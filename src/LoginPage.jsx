import { useState } from 'react';
import './App.css'

export default function LoginPage() {
    const [step, setStep] = useState('register');
    const [registeredUser, setRegisteredUser] = useState();
    const [loggedInUser, setLoggedInUser] = useState();

    return (
        <>
            {step === 'register' && (
                <Register
                    onRegister={(user) => {
                        setRegisteredUser(user);
                        setStep('login');
                    }}
                />
            )}

            {step === 'login' && (
                <Login
                    onLogin={(loginData) => {
                        if (
                            loginData['e-mail'] === registeredUser['e-mail'] &&
                            loginData['şifre'] === registeredUser['şifre']
                        ) {
                            setLoggedInUser(registeredUser.ad);
                            setStep('welcome');
                        } else {
                            alert('Giriş bilgileri yanlış!');
                        }
                    }}
                />
            )}

            {step === 'welcome' && (
                
                <h1 className='welcome'>Hoşgeldin, {loggedInUser}!</h1>
            )}
        </>
    );
}

function Register({ onRegister }) {
    function handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);
        onRegister(formObj);
    }

    return (
        <>
            <div className="form-container">
                <h1>Kayıt Sayfası</h1>
                <form onSubmit={handleRegister} autoComplete="off">
                    <input type="text" name="ad" placeholder="İsminiz" required />
                    <br />
                    <input type="email" name="e-mail" placeholder="E-mail adresiniz" required />
                    <br />
                    <input type="password" name="şifre" placeholder="Şifreniz" required />
                    <br />
                    <button>Kayıt Ol</button>
                </form>
            </div>
        </>
    );
}

function Login({ onLogin }) {
    function handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);
        onLogin(formObj);
    }

    return (
        <>
            <div className="form-container">
                <h1>Giriş Sayfası</h1>
                <form onSubmit={handleLogin} autoComplete="off">
                    <input type="email" name="e-mail" placeholder="E-mail adresiniz" required />
                    <br />
                    <input type="password" name="şifre" placeholder="Şifreniz" required />
                    <br />
                    <button>Giriş Yap</button>
                </form>
            </div>
        </>
    );
}
