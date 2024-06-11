import { useGetResources } from 'services/resource/useResourceService'

export const usePods = () => {
    const { data: resources } = useGetResources()


    // utils/groupByType.js

     const groupByType = (data: any) => {
        return data.reduce((acc: any, item: any) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
        }, {});
    };
  
    return {
        resources: groupByType(resources)
    }
}

export default usePods