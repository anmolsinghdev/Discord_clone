import { currentProfile } from "@/lib/current_profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.serverId) {
      return new NextResponse("Server Id Missing", { status: 400 })
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id
      }
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[DELETE_SERVER_ID]', error)
    return new NextResponse('Internal Error ', { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json()
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.serverId) {
      return new NextResponse("Server Id Missing", { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id
      },
      data: {
        name,
        imageUrl
      }
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[SEVER_ID]', error)
    return new NextResponse('Internal Error ', { status: 500 })
  }
}