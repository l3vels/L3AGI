import React from "react";
import { useGetPods } from "services/pod/usePodService";
import { useGetResources } from "services/resource/useResourceService";
import { Resource } from "types/resource";
import { useLocation } from 'react-router-dom'


const groupByType = (data: any) => {
    return data.reduce((acc: any, item: any) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
    }, {});
};


export const usePod = () => {
    const { data: pods, refetch, loading: pods_loading } = useGetPods()
    const location = useLocation();
    const prevLocation = React.useRef(location);

    React.useEffect(() => {
        if (prevLocation.current.pathname === '/pods/create-pod' && location.pathname === '/pods') {
            refetch()
        }
        prevLocation.current = location;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [location]);

    return {
        pods,
        pods_loading
    }
}

export const useResource = () => {
    const { data: resources } = useGetResources()
  
    return {
        resources: groupByType(resources),
    }
}

export const usePodContent = () => {
  const [resource, setResource] = React.useState<null | Resource>(null)
    const handleSelectResource = (resource: Resource) => {
        setResource(resource)
    }

    return {
        handleSelectResource,
        resource
    }
}