import { collection, orderBy } from 'firebase/firestore';
import * as React from 'react';
import { db, auth } from '../../firebase';
import "./post.css";

export default function Post(props){

    const [comentarios, setComentarios] = React.useState([]);

    const [user, setUser] = React.useState([]);

    React.useEffect(()=>{
        
        const unsubscribe = db.onSnapshot(db.collection(db.getFirestore(), `posts/${props.id}/comentarios`), orderBy("timestamp", "desc"), 
            (snapshot)=>{
                
                setComentarios(snapshot.docs.map((doc)=>{
                    return {id: doc.id, info: doc.data()}
                }));
                
            },
            (error)=>{
                console.log(error);
            },
        );
        
        const authentication = auth.getAuth(); 
        auth.onAuthStateChanged(authentication, (user_get) => {
        if (user_get) {
            setUser(user_get);
        }
        });
    }, [])
    
    const comentar = (id, e)=>{
        e.preventDefault();

        let comentarioAtual = document.getElementById('comentario-'+id);
        
        const ref = db.doc(db.collection(db.getFirestore(), `posts/${id}/comentarios`));
        db.setDoc(ref,{
            nome: user.displayName,
            comentario: comentarioAtual.value,
            timestamp: db.serverTimestamp()
        });

        comentarioAtual.value = "";
        
    }

    return(
        <div className="postSingle">
            <div className='box-image'>
                <img src={props.info.image}/>
            </div>
            <div className='info-post'>
                <p><b>{props.info.userName}</b> : {props.info.titulo}</p>
            </div>
            <div className='coments'>
                <details>
                    <summary>Comentários:</summary>
                    {
                        comentarios.map((val)=>{
                            return(
                                <div className='coment-single'>
                                    <p><b>{val.info.nome}</b> : {val.info.comentario}</p>
                                </div>
                            )
                        })
                    }
                </details>
                
            </div>
            <form onSubmit={(e)=>comentar(props.id,e)}>
                <textarea id={'comentario-'+props.id}></textarea>
                <input type={'submit'} value="Comentar!"/>
            </form>
        </div>
    )
}