import { NextResponse } from "next/server";
import {pool} from '@/libs/mysql';


export async function GET(){
    try {
        const [result] = await pool.query('select * from product');
        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}

export async function POST(req){
    try{
        const {name, description, price} = await req.json;
        const newlink = {
            name,
            description,
            price
        }
        console.log(name, price, description);
        const [result] = await pool.query('insert into product set ?', [newlink]); 
        console.log(result);
    
        return NextResponse.json({
            id: result.insertId,
            name,
            description,
            price,
        })
    } catch (error){
        console.log(error);
        return NextResponse.json({
            message: error.message,
        }, {
            status: 500
        })
    }
}