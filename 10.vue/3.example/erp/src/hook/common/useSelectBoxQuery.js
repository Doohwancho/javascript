import { useQuery } from '@tanstack/vue-query';
import {
    fetchClient,
    fetchManufacturers,
    fetchProductsByManufacturer,
    productListAll,
} from '../../common/selectBoxApi';
//제조사 조회
export const useFecthManufacturers = () => {
    return useQuery({
        queryKey: ['fetchManufacturersQuery'],
        queryFn: fetchManufacturers,
        staleTime: 1000 * 60 * 10, // 10분
    });
};
//제조사 제품 조회
// 제조사 제품 조회
export const useFetchProductsByManufacturer = industryCode => {
    return useQuery({
        queryKey: ['fetchProductsByManufacturerQuery', industryCode], // 쿼리 키에 industryCode를 추가하여 쿼리 식별
        queryFn: () => fetchProductsByManufacturer(industryCode), // 함수 참조를 넘겨주고, industryCode는 쿼리가 실행될 때 전달
        staleTime: 1000 * 60 * 10, // 10분 동안 데이터 캐시 유지
    });
};

//거래처 조회
export const useFecthClient = () => {
    return useQuery({
        queryKey: ['fetchClientQuery'],
        queryFn: fetchClient,
        staleTime: 1000 * 60 * 10, // 10분
    });
};

//제품 전체 조회
export const useProductListAll = () => {
    return useQuery({
        queryKey: ['productListAllQuery'],
        queryFn: productListAll,
        staleTime: 1000 * 60 * 10, // 10분
    });
};
