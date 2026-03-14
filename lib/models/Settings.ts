import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  theme: {
    primaryBg: string;
    secondaryBg: string;
    cardBg: string;
    borderColor: string;
    primaryText: string;
    secondaryText: string;
    buttonBg: string;
    buttonText: string;
    accentColor: string;
  };
  fonts: {
    family: string;
    headingSize: string;
    bodySize: string;
    animationEnabled: boolean;
  };
  layout: {
    showBorders: boolean;
    cardSpacing: string;
    sectionPadding: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
  {
    theme: {
      primaryBg: {
        type: String,
        default: '#0C0C08'
      },
      secondaryBg: {
        type: String,
        default: '#2E2622'
      },
      cardBg: {
        type: String,
        default: '#C1BFBE'
      },
      borderColor: {
        type: String,
        default: '#4C4D4E'
      },
      primaryText: {
        type: String,
        default: '#C1BFBE'
      },
      secondaryText: {
        type: String,
        default: '#5F5F60'
      },
      buttonBg: {
        type: String,
        default: '#2E2622'
      },
      buttonText: {
        type: String,
        default: '#C1BFBE'
      },
      accentColor: {
        type: String,
        default: '#4C4D4E'
      }
    },
    fonts: {
      family: {
        type: String,
        default: 'Inter, sans-serif'
      },
      headingSize: {
        type: String,
        default: '2.5rem'
      },
      bodySize: {
        type: String,
        default: '1rem'
      },
      animationEnabled: {
        type: Boolean,
        default: true
      }
    },
    layout: {
      showBorders: {
        type: Boolean,
        default: false
      },
      cardSpacing: {
        type: String,
        default: '1.5rem'
      },
      sectionPadding: {
        type: String,
        default: '5rem'
      }
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings ||
  mongoose.model<ISettings>('Settings', SettingsSchema);
