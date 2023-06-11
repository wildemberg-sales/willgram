import * as React from "react";
import "./loginScreen.css";

import {auth} from '../../firebase.js'

function LoginScreen() {

    const cadastrar = (email, password, nome, sobrenome) =>{
        auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            let authentication = auth.getAuth()
            auth.updateProfile(authentication.currentUser,{
                displayName: nome +" "+sobrenome
            }).then(()=>{

            }).catch((error)=>{
                alert(error)
            })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        alert("Cadastrado com sucesso!");
    }

    const login = (email, senha) => {
        const authentication = auth.getAuth();
        auth.signInWithEmailAndPassword(authentication, email, senha)
        .then((userCredential) => {
            sessionStorage.setItem('uid', userCredential.user.uid);
            window.location.reload()
        })
        .catch((error)=>{
            console.log("error code: " + error.code + "and error message: " + error.message);
            let messageError = document.querySelector('.error-message');
            messageError.innerHTML = "";
            messageError.innerHTML += `
                <p>Usuário ou senha inválida</p> 
            `            
        })
    };



    return(
        <div className="LoginScreen">
            <div className="center">
                <div className="box-form">
                    <div className="logo">
                        <h2>Willgram</h2>                    
                    </div>
                    <div className="error-message"></div>
                    <div className="form-login">
                        <input type="email" id="email" name="email" placeholder="Email..." />
                        <input type="password" id="senha" name="senha" placeholder="Senha..." />
                        <input type="submit" name="acao" value="Logar" onClick={()=>{
                            let email = document.getElementById('email').value;
                            let senha = document.getElementById('senha').value;
                            login(email, senha);
                        }}/>
                    </div>
                </div>
            </div>
            <div className="center">
                <div className="box-cad">
                    <form className="form-cad">
                        <fieldset>
                            <legend>Ou Cadastre-se</legend>

                            <input type={'email'} id="email-cad" name="email-cad" placeholder="Novo Email..." />
                            <input type={'text'} id="nome" name="nome" placeholder="Primeiro nome..."/>
                            <input type={'text'} id="sobrenome" name="sobrenome" placeholder="Sobrenome..."/>
                            <input type={'password'} id="senha-cad" name="senha-cad" placeholder="Nova Senha..." />
                            <input type={'password'} id="repetir-senha-cad" name="repetir-senha-cad" placeholder="Repetir Nova Senha..." />
                            <input type={'submit'} name='acao' value="Cadastrar" onClick={(e)=>{
                                e.preventDefault()
                                let emailcad = document.getElementById('email-cad').value;
                                let senhacad = document.getElementById('senha-cad').value;
                                let nome = document.getElementById('nome').value;
                                let sobrenome = document.getElementById('sobrenome').value;
                                let repsenhacad = document.getElementById('repetir-senha-cad').value;
                                
                                if(senhacad.length<6){
                                    window.alert("senha menor que 6 digitos não pode ser cadastrada");
                                }else if(senhacad !== repsenhacad){
                                    window.alert('senhas diferentes, impossível realizar cadastro!');
                                }else{
                                    cadastrar(emailcad, senhacad, nome, sobrenome);
                                }
                                
                                document.getElementById('email-cad').value = "";
                                document.getElementById('senha-cad').value = "";
                                document.getElementById('nome').value = "";
                                document.getElementById('sobrenome').value = "";
                                document.getElementById('repetir-senha-cad').value = "";
                            }}/>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;