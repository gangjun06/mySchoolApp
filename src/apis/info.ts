import Axios, { AxiosStatic } from 'axios'

const neisKey = process.env.REACT_APP_NEIS_KEY

export interface ICafeteria {
  MMEAL_SC_NM: string
  DDISH_NM: string
  CAL_INFO: string
  NTR_INFO: string
}

export const requestCafeteria = () =>
  Axios.get('https://open.neis.go.kr/hub/mealServiceDietInfo', {
    params: {
      KEY: neisKey,
      Type: 'json',
      pIndex: 1,
      pSize: 50,
      ATPT_OFCDC_SC_CODE: 'R10',
      SD_SCHUL_CODE: '8750198',
      MLSV_YMD: '20201109'
    }
  })
