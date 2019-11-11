import { ComponentType, Ref, RefForwardingComponent } from 'react';
import JQuery = require('jquery');

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

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface OriginalImageInfo {
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

export type Uuid = string;

export interface SourceInfo {
  source: string;
  file: any;
}

export interface FileInfo {
  uuid: Uuid;
  name: null | string;
  size: null | number;
  isStored: null | boolean;
  isImage: null | boolean;
  originalImageInfo: null | OriginalImageInfo;
  mimeType: string;
  originalUrl: null | string;
  cdnUrl: null | string;
  cdnUrlModifiers: null | string;
  sourceInfo: null | SourceInfo;
}

export type OnTabVisibilityCallback = (tab: string, shown: boolean) => void;

export interface DialogApi {
  addFiles(files: FileInfo[]): void;
  switchTab(tab: string): void;
  fileColl: FileInfo[];
  hideTab(tab: string): void;
  showTab(tab: string): void;
  isTabVisible(tab: string): boolean;
  onTabVisibility(callback: OnTabVisibilityCallback): void;
}

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

export type CustomTabConstructor = (
  container: JQuery,
  button: JQuery,
  dialogApi: DialogApi,
  settings: Settings,
  name: string,
  uploadcare: any
) => void;

export type Validator = ((fileInfo: FileInfo) => void);

export const Widget: RefForwardingComponent<{
  locale?: Locale;
  localeTranslations?: LocaleTranslations;
  localePluralize?: LocalePluralize;
  preloader?: string;
}, WidgetProps>;
