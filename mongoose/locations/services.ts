import { QueryOptions } from "mongoose";
import Locations from "@/mongoose/locations/model";
import { FilterWishlistType, FilterLocationType } from "@/mongoose/locations/custom";
import { LocationType } from "@/mongoose/locations/schema";

// base location search with filter support:
async function findLocations(filter: FilterLocationType | FilterWishlistType | {}): Promise<LocationType[] | []> {
    try {
        const result: Array<LocationType | undefined> = await Locations.find(filter);
        return result as LocationType[];
    } catch (error) {
        console.log(error);
    }

    return [];
}

export async function findAllLocations(): Promise<LocationType[] | []> {
    const filter = {};
    return await findLocations(filter);
}

export async function findLocationById(location_ids: string[]): Promise<LocationType[] | []> {
    const filter: FilterLocationType = {
        location_id: location_ids,
    };
    return await findLocations(filter);
}

export async function onUserWishList(user_id: string): Promise<LocationType[] | []> {
    const filter: FilterWishlistType = {
        on_wishlist: {
            $in: [user_id],
        },
    };
    return await findLocations(filter);
}

// base wishlist support
export async function updateWishlist(
    location_id: string,
    user_id: string,
    action: string,
): Promise<LocationType[] | null | {}> {
    const filter = {
        location_id: location_id,
    };
    const options: QueryOptions = {
        upsert: true,
        returnDocument: "after",
    };

    let update = {};
    if (action === "add") {
        update = {$push: { on_wishlist: user_id } };
    } else if (action === "remove") {
        update = {$pull: { on_wishlist: user_id } };
    } else {
        throw new Error("Invalid action");
    }

    try {
        const result: LocationType | null = await Locations.findOneAndUpdate(filter, update, options);
        return result;
    } catch (error) {
        console.log(error);
    }

    return {};
}
