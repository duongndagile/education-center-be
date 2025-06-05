import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'libs/mongo/schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  create(post: any) {
    return this.postModel.create(post);
  }

  findAll() {
    return this.postModel.find().populate('author');
  }

  update(id: string, post: any) {
    return this.postModel.findByIdAndUpdate(id, post, { new: true });
  }

  delete(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
