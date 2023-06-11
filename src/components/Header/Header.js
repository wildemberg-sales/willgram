import * as React from "react";
import "./header.css"
import { auth, storage, db } from "../../firebase";

export default function Header(){
    const [user, setUser] = React.useState([]);
    const [ progress, setProgress] = React.useState(0);
    const [file, setFile] = React.useState(null);
    const [count, setCount] = React.useState(0);

    React.useEffect(()=>{

        const authentication = auth.getAuth(); 
        auth.onAuthStateChanged(authentication, (user_get) => {
        if (user_get) {
            setUser(user_get);
        }
        });
    },[]);

    function abrirModalUpload(e){
        e.preventDefault();
        let modal = document.querySelector('.modalUpload');
        modal.style.display = "block";
    }

    function fecharModalUpload(e){
        let modal = document.querySelector('.modalUpload');
        modal.style.display = "none";
    }

    function uploadPost(e){

        e.preventDefault(); //faz com que evite de enviar e recarregar a pagina

        let tituloPost = document.getElementById('titulo-upload').value;

        const upload = storage.ref(storage.getStorage(), `images/${file.name}`);
        const uploadTask = storage.uploadBytesResumable(upload, file);

        uploadTask.on('state_changed', (snapshot)=>{

            //para acompanhar o progresso do upload
            const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            setProgress(progress);

        }, function erro(error){

            alert(error.message)

        }, function(){

            //pego a url no banco para salvar
            storage.getDownloadURL(uploadTask.snapshot.ref)
            .then(function(url){
                db.addDoc(db.collection(db.getFirestore(),'posts'), {
                    titulo: tituloPost,
                    image: url,
                    userName: user.displayName,
                    date: new Date()
                });

                setProgress(0);
                setFile(null);
                document.getElementById('form-upload').reset();
                fecharModalUpload();
                alert('Upload realizado com sucesso!');

            })
        })

    }

    return(
        <header>
            <div className="logo-header">
                <h2>Willgram</h2>
            </div>
            <div className="icons">
                <button className="button-postar" onClick={(e)=>abrirModalUpload(e)} title="Postar!">
                    <img src="https://img.icons8.com/ios-filled/2x/plus.png" title="Postar!"/>
                </button>
                <button className="exit" title="Sair" onClick={()=>{
                    auth.signOut(auth.getAuth());
                    sessionStorage.clear()
                    window.location.reload()}}
                ><img src="https://img.icons8.com/wired/2x/logout-rounded.png" title="Sair"/></button>
                <p>{user.displayName}</p>
            </div>

            <div className="modalUpload">
                <div className="formUpload">
                    <div onClick={()=>fecharModalUpload()} className="close-modal-upload"><p>X</p></div>
                    <h2>Postar</h2>
                        <form onSubmit={(e)=>uploadPost(e)} id="form-upload">
                            <progress id="progress-upload" value={progress}></progress>
                            <input id="titulo-upload" type={'text'} placeholder="Nome da sua foto..."/>
                            <input onChange={(e)=>setFile(e.target.files[0])} type={'file'} name="file" />
                            <input type={'submit'} value="Postar"/>
                        </form>
                </div>
            </div>
        </header>
    )
}
