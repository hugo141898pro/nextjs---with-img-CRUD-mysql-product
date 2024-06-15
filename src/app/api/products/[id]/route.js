import { NextResponse } from "next/server";
import {pool} from '@/libs/mysql';

export async function GET(req, {params}){
    try {
        console.log(params.id);
        const [result] = await pool.query('select * from product where id = ?', [params.id]);
        if(result.length === 0){
            return NextResponse.json({
                message: "producto no encontrado"
            },{
                status: 404,
            })
        }
        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}
export async function DELETE(req, {params}){
    try {

        const [result] = await pool.query('delete from product where id = ?', [params.id])

        if(result.affectedRows === 0){
            return NextResponse.json({
                message: "producto no encontrado"
            },{
                status: 404
            })
        }
    
        return new Response(null, {
            status: 204
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}

export async function PUT(req, {params}){
    const data = await req.json();
        const updateData = await pool.query('update product set ? where id = ?', [data, params.id]);
        
        if(updateData.affectedRows === 0){
            return NextResponse.json({
                message: "no se encontro",
            }, {
                status: 404
            })
        }

        const updateProduct = await pool.query("select * from product where id = ?", [params.id]);

        console.log(updateData);
        return NextResponse.json(updateProduct[0]);

}