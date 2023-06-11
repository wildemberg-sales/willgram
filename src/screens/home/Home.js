import * as React from "react";
import "./home.css";
import { auth, storage, db } from "../../firebase";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import { orderBy } from "firebase/firestore";

export default function Home() {

    const [posts, setPosts] = React.useState([]);

    React.useEffect(()=>{

        const q = db.query(db.collection(db.getFirestore(), "posts"), db.orderBy("date", "desc"));
        const unsubscribe = db.onSnapshot(q, (querySnapshot)=>{
            setPosts(querySnapshot.docs.map((doc)=>{
                return {id: doc.id, info: doc.data()}
            }, 
            (error)=>{
                console.log(error)
            }
            ))
        });

    },[]);
    
    return(
        <div className="Home">
            <Header/>
            
            {
                posts.map((val)=>{
                    return (
                        <Post info={val.info} id={val.id} />
                    )
                })
            }
           
                
        </div>
    );
}