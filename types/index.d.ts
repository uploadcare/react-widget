import { ComponentType, FunctionComponent, Ref, RefForwardingComponent } from 'react';

export type Locale =
  'en' |
  'ar' |
  'az' |
  'ca' |
  'cs' |
  'da' |
  'de' |
  'el' |
  'es' |
  'et' |
  'fr' |
  'he' |
  'it' |
  'ja' |
  'ko' |
  'lv' |
  'nb' |
  'nl' |
  'pl' |
  'pt' |
  'ro' |
  'ru' |
  'sk' |
  'sr' |
  'sv' |
  'tr' |
  'uk' |
  'vi' |
  'zhTW' |
  'zh';

export type LocalePluralize = (n: number) => string;

export interface LocaleTranslations {
  uploading?: string;
  loadingInfo?: string;
  errors?: {
    default?: string;
    baddata?: string;
    size?: string;
    upload?: string;
    user?: string;
    info?: string;
    image?: string;
    createGroup?: string;
    deleted?: string;
  };
  draghere?: string;
  file?: {
    one?: string;
    other?: string;
  };
  buttons?: {
    cancel?: string;
    remove?: string;
    choose?: {
      files?: {
        one?: string;
        other?: string;
      },
      images?: {
        one?: string;
        other?: string;
      }
    }
  };
  dialog?: {
    close?: string;
    openMenu?: string;
    done?: string;
    showFiles?: string;
    tabs?: {
      names?: {
        'empty-pubkey'?: string;
        preview?: string;
        file?: string;
        url?: string;
        camera?: string;
        facebook?: string;
        dropbox?: string;
        gdrive?: string;
        gphotos?: string;
        instagram?: string;
        vk?: string;
        evernote?: string;
        box?: string;
        onedrive?: string;
        flickr?: string;
        huddle?: string;
      };
      file?: {
        drag?: string;
        nodrop?: string;
        cloudsTip?: string;
        or?: string;
        button?: string;
        also?: string;
      };
      url?: {
        title?: string;
        line1?: string;
        line2?: string;
        input?: string;
        button?: string;
      };
      camera?: {
        title?: string;
        capture?: string;
        mirror?: string;
        startRecord?: string;
        stopRecord?: string;
        cancelRecord?: string;
        retry?: string;
        pleaseAllow?: {
          title?: string;
          text?: string;
        };
        notFound?: {
          title?: string;
          text?: string;
        }
      };
      preview?: {
        unknownName?: string;
        change?: string;
        back?: string;
        done?: string;
        unknown?: {
          title?: string;
          done?: string;
        };
        regular?: {
          title?: string;
          line1?: string;
          line2?: string;
        };
        image?: {
          title?: string;
          change?: string;
        };
        crop?: {
          title?: string;
          done?: string;
          free?: string;
        };
        video?: {
          title?: string;
          change?: string;
        };
        error?: {
          default?: {
            title?: string;
            text?: string;
            back?: string;
          };
          image?: {
            title?: string;
            text?: string;
            back?: string;
          };
          size?: {
            title?: string;
            text?: string;
          };
          loadImage?: {
            title?: string;
            text?: string;
          }
        };
        multiple?: {
          title?: string;
          question?: string;
          tooManyFiles?: string;
          tooFewFiles?: string;
          clear?: string;
          done?: string;
          file?: {
            preview?: string;
            remove?: string;
          }
        }
      }
    };
    footer?: {
      text?: string;
      link?: string;
    }
  };
}

export const Panel: FunctionComponent<{
  locale: Locale;
  localeTranslations: LocaleTranslations;
  localePluralize: (n: number) => string;
  preloader?: string;
}>;

export interface Progress {
  size: number;
  done: number;
  total: number;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface ImageInfo {
  height: number;
  width: number;
  geo_location: null | GeoLocation;
  datetime_original: string;
  format: string;
  color_mode: string;
  dpi: null | number[];
  orientation: null | number;
  sequence?: boolean;
}

export interface Audio {
  bitrate: number | null;
  codec: string | null;
  sample_rate: number | null;
  channels: string | null;
}

export interface Video {
  height: number;
  width: number;
  frame_rate: number;
  bitrate: number;
  codec: string;
}

export interface VideoInfo {
  duration: number;
  format: string;
  bitrate: number;
  audio: Audio | null;
  video: Video;
}

export type Uuid = string;

export interface FileInfo extends Progress {
  uuid: Uuid;
  file_id: Uuid;
  original_filename: string;
  filename: string;
  mime_type: string;
  is_image: string;
  is_store: string;
  is_ready: string;
  image_info: null | ImageInfo;
  video_info: null | VideoInfo;
}

export interface Container {}

export interface Button {}

export interface DialogApi {}

export interface Settings {
  // developer hooks
  live?: boolean;
  manualStart?: boolean;
  locale?: Locale;
  localePluralize?: (n: number) => string;
  localeTranslations?: LocaleTranslations;
  // widget & dialog settings
  systemDialog?: boolean;
  crop?: boolean;
  previewStep?: boolean;
  imagesOnly?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  multipleMax?: number;
  multipleMin?: number;
  multipleMaxStrict?: boolean;
  imageShrink?: boolean;
  pathValue?: boolean;
  tabs?: string;
  preferredTypes?: string;
  inputAcceptTypes?: string; // '' means default, null means "disable accept"
  // upload settings
  doNotStore?: boolean;
  publicKey: string | null;
  secureSignature?: string;
  secureExpire?: number;
  pusherKey?: string;
  cdnBase?: string;
  urlBase?: string;
  socialBase?: string;
  previewProxy?: string | null;
  previewUrlCallback?: ((originalUrl: string, fileInfo: FileInfo) => string) | null;
  // fine tuning
  imagePreviewMaxSize?: number;
  multipartMinSize?: number;
  multipartPartSize?: number;
  multipartMinLastPartSize?: number;
  multipartConcurrency?: number;
  multipartMaxAttempts?: number;
  parallelDirectUploads?: number;
  passWindowOpen?: boolean;
  // camera recording
  audioBitsPerSecond?: number | null;
  videoBitsPerSecond?: number | null;
  // maintain settings
  scriptBase?: string;
  debugUploads?: boolean;
  integration?: string;
}

export interface WidgetAPI {
  openDialog: (tab: string) => void;
  reloadInfo: () => void;
  getInput: () => HTMLInputElement;
}

export interface WidgetProps extends Settings {
  value?: string;
  onChange?: (fileInfo: FileInfo) => void;
  onFileSelect?: (fileInfo: FileInfo) => void;
  customTabs?: {[key: string]: CustomTabConstructor};
  validators?: Validator[];
  preloader?: ComponentType;
  ref?: Ref<WidgetAPI>;
}

export interface Uploadcare {}

export type CustomTabConstructor = (
  container: Container,
  button: Button,
  dialogApi: DialogApi,
  settings: Settings,
  name: string,
  uploadcare: Uploadcare
) => void;

export type Validator = ((fileInfo: FileInfo) => void);

export const Widget: RefForwardingComponent<{
  locale?: Locale;
  localeTranslations?: LocaleTranslations;
  localePluralize?: LocalePluralize;
  preloader?: string;
}, WidgetProps>;
