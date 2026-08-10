import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = new this.contactModel(createContactDto);
    return contact.save();
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException('Contact message not found');
    }
    return contact;
  }

  async markAsRead(id: string): Promise<Contact> {
    const contact = await this.contactModel
      .findByIdAndUpdate(id, { read: true }, { new: true })
      .exec();
    if (!contact) {
      throw new NotFoundException('Contact message not found');
    }
    return contact;
  }

  async remove(id: string): Promise<void> {
    const result = await this.contactModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Contact message not found');
    }
  }

  async getUnreadCount(): Promise<number> {
    return this.contactModel.countDocuments({ read: false }).exec();
  }
}
