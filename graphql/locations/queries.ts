import { findAllLocations, findLocationById, onUserWishList } from "@/mongoose/locations/services";

export const locationQueries = {
    allLocations: async (_: any) => {
        return await findAllLocations();
    },
    locationsById: async (_: any, param: { location_ids: string[] }) => {
        return await findLocationsById(param.location_ids);
    },
    onUserWishlist: async (_: any, param: { user_id: string }) => {
        return await onUserWishList(param.user_id);
    },
};
