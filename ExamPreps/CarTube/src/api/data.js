import * as api from './api.js';
import {get} from "./api.js";

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllListings(){
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
}
/*
export async function getAllListings(page = 1){
    return await api.get(host + `/data/cars?sortBy=_createdOn%20desc&offset=${(page - 1)*3}&pageSize=3`); //last 3 is because we want to have only 3 items per page
} // for pagination purposes */

export async function getListingByID(id){
    return await api.get(host + '/data/cars/'+id);
}

export async function createListing(data){
    return await api.post(host + '/data/cars', data);
}

export async function updateListingById(id, data){
    return await api.put(host + '/data/cars/' + id, data);
}

export async function deleteListing(id){
    return await api.del(host + '/data/cars/' + id)
}
export async function getMyListings(userId){
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function search(query){
    return await api.get(host + `/data/cars?where=year%3D${query}`);
}

export async function getCollectionSize(){
    return await api.get(host + '/data/cars?count');
}