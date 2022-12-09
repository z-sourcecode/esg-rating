import ESG_CONFIG from './config'
import API from './api'


export const api = new API(
    ESG_CONFIG().Endpoint,
    ESG_CONFIG().Resources,
    'TOKEN GOES HERE'
);

export const scan_table = (params) => {
    return api.get_resource('scan_table','POST',params,null)
}


export const esg_rating = (params) => {
    return api.get_resource('esg','POST',params,'')
  } 

export const get_muni_data  = (params) => {
    return api.get_resource('get_muni_data','POST',params,'')
  } 

export const get_rating_by_security  = (params) => {
  return api.get_resource('get_rating_by_security','POST',params,'')
} 