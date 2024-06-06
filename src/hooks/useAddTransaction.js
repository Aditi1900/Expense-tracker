import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// this function will give you a timestamp of the current moment where the function was called
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();

    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType,
    }) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()

        });
    };
    return { addTransaction };
};