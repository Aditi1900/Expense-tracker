import { useEffect, useState } from "react";
import { query,collection,where, orderBy, onSnapshot } from "firebase/firestore";
import {useGetUserInfo } from './useGetUserInfo';
import {db} from "../config/firebase-config";


export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0, 
        expenses: 0.0
    });

    const transactionCollectionRef = collection(db, "transactions");
    const {userID} = useGetUserInfo();
 
    const getTransactions = async () => {
        let unsubscribe;
        try{
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID","==",userID),
                orderBy("createdAt")
            );
             unsubscribe = onSnapshot(queryTransactions,(snapshot) =>{
             // whatever data you put inside is whatever data you get back from the current snapshot of the query   
             let docs = [];
             let totalIncome = 0;
             let totalExpenses = 0;

             snapshot.forEach((doc) => {
                const data = doc.data(); 
                const id = doc.id;
               docs.push({...data,id});

               if (data.transactionType === "expense") {
                totalExpenses += Number(data.transactionAmount);
               }
                else {
                    totalIncome += Number(data.transactionAmount);
                }
               
             });
             setTransactions(docs);
             let balance = totalIncome - totalExpenses;
             setTransactionTotals({
                balance,
                expenses: totalExpenses,
                income: totalIncome,
             })
            });

        }
        catch(err) {
            console.error(err);
        }
        return () => unsubscribe();
    };

    useEffect(() => {
        // we created a seperate getTransactions function because it has to be async and 
        //async cannot be used in useEffect hook. The function has to be async as we are 
        //connecting it with firebase
        getTransactions()
    })
    return { transactions ,transactionTotals};
};