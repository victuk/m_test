import { galleryCollection } from "@/models/Gallery";
import { NextRequest, NextResponse } from "next/server";
import { logIt } from "../../utils";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get("page");
        const limit = searchParams.get("limit");

        const pictures = await galleryCollection.paginate({}, parseInt(page as string), parseInt(limit as string));

        return NextResponse.json({
            isSuccessful: true,
            pictures
        }, {
            status: 200
        });

    } catch (error) {
        logIt({value: error, level: "error"});
        return NextResponse.json({
            isSuccessful: false,
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
