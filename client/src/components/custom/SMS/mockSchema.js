// Optimized SMS database schema

const mockSMSchema = {
  // Notice: users table is already existing in the database!

  contact: {
    id: { 
      type: 'string', 
      required: true,
      unique: true
    },
    name: { 
      type: 'string', 
      required: true,
      minLength: 1,
      maxLength: 100
    },
    relatedEntity: {
      type: { type: 'string', required: false, enum: ['lease_leads', 'service', 'marketplace', 'off_market', 'manual', 'website', 'referral'], default: 'manual' }, // what collection this comes from (lease leads, service, marketplace, off market, manual, website, referral)
      id: { type: 'string', required: false } // ID of the lead or client
    },
    phoneNumber: { 
      type: 'string', 
      required: true,
      unique: true,
      index: true // For fast lookups
    },
    email: { 
      type: 'string', 
      required: false,
      index: true // For fast lookups
    },
    notes: { 
      type: 'string', 
      required: false,
      maxLength: 1000
    },
    // Optimized conversations structure
    conversations: [
      {
        id: { 
          type: 'string', 
          required: true,
        },
        userId: { 
          type: 'string', 
          required: true,
          foreignKey: 'users.id' // Reference to users table
        },
        lastMessage: { 
          type: 'string', 
          required: false,
        },
        lastMessageTime: { 
          type: 'date', 
          required: false,
          index: true // For sorting conversations by recent activity
        },
        lastMessageId: { 
          type: 'string', 
          required: false,
          foreignKey: 'smsMessages.id' // Direct reference to last message
        },
        unreadCount: { 
          type: 'number', 
          required: false, 
          default: 0,
          min: 0,
          max: 999 // Reasonable limit
        },
        isActive: { 
          type: 'boolean', 
          required: false, 
          default: true // For soft deletion/archiving
        },
        createDate: { 
          type: 'date', 
          required: true, 
          default: new Date(),
          index: true // For sorting by creation date
        },
        updateDate: { 
          type: 'date', 
          required: true, 
          default: new Date(),
          index: true // For tracking changes
        },
      }
    ],
    isActive: { 
      type: 'boolean', 
      required: false, 
      default: true // For soft deletion
    },
    createDate: { 
      type: 'date', 
      required: true, 
      default: new Date(),
      index: true
    },
    updateDate: { 
      type: 'date', 
      required: true, 
      default: new Date(),
      index: true
    },
  }, 

  smsMessages: {
    id: { 
      type: 'string', 
      required: true,
      unique: true
    },
    conversationId: { 
      type: 'string', 
      required: true,
      foreignKey: 'contact.conversations.id', // Proper foreign key reference
      index: true // Critical for performance - most queried field
    },
    senderType: { 
      type: 'string', 
      required: true, 
      enum: ['user', 'contact', 'system'], 
      default: 'system'
    }, 
    senderId: { 
      type: 'string', 
      required: false,
      // Conditional foreign key based on senderType
      foreignKey: {
        user: 'users.id',
        contact: 'contact.id'
      }
    },
    body: { 
      type: 'string', 
      required: true,
      maxLength: 1600 // SMS character limit
    },
    mediaUrl: { 
      type: 'string', 
      required: false,
      pattern: '^https?://.+$' // URL validation
    },
    mediaType: { 
      type: 'string', 
      required: false,
      enum: ['image', 'video', 'audio', 'document'],
      // Only required if mediaUrl is present
      requiredIf: 'mediaUrl'
    },
    direction: { 
      type: 'string', 
      required: true, 
      enum: ['inbound', 'outbound'], 
      default: 'outbound',
      index: true // For filtering messages by direction
    },
    // Optimized status tracking
    currentStatus: { 
      type: 'string', 
      required: true, 
      enum: ['queued', 'sent', 'delivered', 'failed', 'read'],
      default: 'queued',
      index: true // For fast status queries
    },
    statusHistory: [  
      { 
        status: { 
          type: 'string', 
          required: true, 
          enum: ['queued', 'sent', 'delivered', 'failed', 'read']
        }, 
        at: { 
          type: 'date', 
          required: true, 
          default: new Date()
        },
        reason: { 
          type: 'string', 
          required: false,
          maxLength: 200 // For error messages or delivery notes
        }
      }
    ],
    // Computed fields for performance
    isActive: { 
      type: 'boolean', 
      required: false, 
      default: true
    }, // Soft deletion

    // Timestamps
    createDate: { 
      type: 'date', 
      required: true, 
      default: new Date(),
      index: true // For sorting and date-based queries
    },
    updateDate: { 
      type: 'date', 
      required: true, 
      default: new Date(),
      index: true
    },
  },


};


export default mockSMSchema;