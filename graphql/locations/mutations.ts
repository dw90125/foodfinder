import { updateWishlist } from "@/mongoose/locations/services";

interface UpdateWishlistInterface {
    location_id: string;
    user_id: string;
}

export const locationMutations = {
    addWishlist: async (_: any, param: UpdateWishlistInterface, context: {}) => {
        return await updateWishlist(param.location_id, param.user_id, "add");
    },
    removeWishlist: async (_: any, param: UpdateWishlistInterface, context: {}) => {
        return await updateWishlist(param.location_id, param.user_id, "remove");
    }
};


