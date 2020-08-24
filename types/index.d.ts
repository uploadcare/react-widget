import { ComponentType, Ref, RefForwardingComponent } from 'react';
import JQuery = require('jquery');

type Locale =
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

type LocalePluralize = (n: number) => string;

interface LocaleTranslations {
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
  effects?: {
    captions?: {
      blur?: string;
      crop?: string;
      enhance?: string;
      flip?: string;
      grayscale?: string;
      invert?: string;
      mirror?: string;
      rotate?: string;
      sharp?: string;
    };
    apply?: string;
  };
}

interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface OriginalImageInfo {
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

type Uuid = string;

interface SourceInfo {
  source: string;
  file: any;
}

interface FileInfo {
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

type OnTabVisibilityCallback = (tab: string, shown: boolean) => void;

interface DialogApi {
  addFiles(files: FileInfo[]): void;
  switchTab(tab: string): void;
  fileColl: FileInfo[];
  hideTab(tab: string): void;
  showTab(tab: string): void;
  isTabVisible(tab: string): boolean;
  onTabVisibility(callback: OnTabVisibilityCallback): void;
}

interface Settings {
  // developer hooks
  locale?: Locale;
  localePluralize?: (n: number) => string;
  localeTranslations?: LocaleTranslations;
  // widget & dialog settings
  systemDialog?: boolean;
  crop?: string;
  previewStep?: boolean;
  imagesOnly?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  multipleMax?: number;
  multipleMin?: number;
  multipleMaxStrict?: boolean;
  imageShrink?: string;
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
  // effects tab
  effects?: string | string[];
}

interface WidgetAPI {
  openDialog: (tab: string) => void;
  reloadInfo: () => void;
  getInput: () => HTMLInputElement;
}

type FileUpload = JQuery.Deferred<FileInfo>;
interface FilesUpload {
  promise: () => FileUpload;
  files: () => FileUpload[];
}

interface WidgetProps extends Settings {
  value?: string;
  onChange?: (fileInfo: FileInfo) => void;
  onFileSelect?: (fileInfo: FileUpload | FilesUpload | null) => void;
  onDialogOpen?: (dialog: DialogApi) => void;
  onDialogClose?: (info: FileUpload | FilesUpload | null) => void;
  onTabChange?: (tabName: string) => void;
  customTabs?: {[key: string]: CustomTabConstructor};
  validators?: Validator[];
  tabsCss?: string;
  preloader?: ComponentType | null;
  ref?: Ref<WidgetAPI>;
}

type CustomTabConstructor = (
  container: JQuery,
  button: JQuery,
  dialogApi: DialogApi,
  settings: Settings,
  name: string,
  uploadcare: any
) => void;

type Validator = ((fileInfo: FileInfo) => void);

declare const Widget: RefForwardingComponent<{
  locale?: Locale;
  localeTranslations?: LocaleTranslations;
  localePluralize?: LocalePluralize;
}, WidgetProps>;

export {
  Locale,
  LocalePluralize,
  LocaleTranslations,
  GeoLocation,
  OriginalImageInfo,
  Uuid,
  SourceInfo,
  FileInfo,
  DialogApi,
  OnTabVisibilityCallback,
  Settings,
  WidgetAPI,
  WidgetProps,
  CustomTabConstructor,
  Validator,
  Widget
};
