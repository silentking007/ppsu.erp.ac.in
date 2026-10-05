import { NextResponse } from 'next/server';
import { db, ensureSchema } from '../../../lib/db';
import { setSession, verifyPassword } from '../../../lib/auth';
export async function POST(req){ try{await ensureSchema();const {username,password,role}=await req.json(); if(!username||!password)return NextResponse.json({error:'Username and password are required.'},{status:400}); const r=await db.execute({sql:'SELECT * FROM users WHERE username=?',args:[username.trim()]}); const u=r.rows[0]; if(!u||!(await verifyPassword(password,u.password_hash)))return NextResponse.json({error:'Invalid username or password.'},{status:401}); await setSession(u.id,'student'); return NextResponse.json({ok:true});}catch(e){console.error(e);return NextResponse.json({error:'Server/database error.'},{status:500});}}
